import { validationResult } from "express-validator";
import HttpError from "../init/http-error.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import getDataUri from "../middleware/dataUri.js";
import dataFuncCloudinary from "../middleware/cloudinary.js";
import { pool } from "../init/configurasiPostgres.js";
import { balikinDataMemberByEmail } from "../func/fungsiRefactor.js";

export const postUser = async (req, res, next) => {
  try {
    const { email, first_name, last_name, password } = req.body;

    const error = validationResult(req);
    const queryInput = `INSERT INTO membership(email, first_name, last_name, password) VALUES ($1, $2, $3, $4)`;

    if (!error.isEmpty()) throw new HttpError(error.array()[0 ?? 1].msg, 400);

    await bcrypt.hash(password, 10, async (err, hash) => {
      try {
        if (err) throw new HttpError("Tidak bisa encrype password", 400);
        else {
          await pool.query(queryInput, [email, first_name, last_name, hash]);

          res.status(200).json({
            status: 200,
            message: "Registrasi berhasil silahkan login",
            data: null,
          });
        }
      } catch (err) {
        next(err);
      }
    });
  } catch (err) {
    next(err);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const error = validationResult(req);
    if (!error.isEmpty()) throw new HttpError(error.array()[0 ?? 1].msg, 400);

    const { rows } = await pool.query(
      `SELECT * FROM membership WHERE email = $1`,
      [email],
    );

    if (rows.length === 0) throw new HttpError("email tidak ditemukan", 404);

    await bcrypt.compare(password, await rows[0]?.password, (err, result) => {
      try {
        if (!result) throw new HttpError("Password Salah", 401);
        else {
          const token = jwt.sign({ email: rows[0]?.email }, "rahasia_ilahi", {
            expiresIn: "12h",
          });

          res.status(200).json({
            status: 200,
            message: "Login Sukses",
            data: { token },
          });
        }
      } catch (err) {
        next(err);
      }
    });
  } catch (err) {
    next(err);
  }
};

export const getProfile = async (req, res, next) => {
  try {
    const rows = await balikinDataMemberByEmail(pool, req);

    const datas = await pool.query(`SELECT * FROM informations`);

    console.log(datas.rows[0].service);

    if (!rows[0]) throw new HttpError("user tidak ditemukan", 401);

    res.status(200).json({
      status: 200,
      message: "Sukses",
      data: rows[0],
    });
  } catch (err) {
    console.log(err, `ler`);
    next(err);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const { first_name, last_name } = req.body;

    const error = validationResult(req);

    if (!error.isEmpty()) throw new HttpError(error.array()[0 ?? 1].msg, 400);

    await pool.query(
      "update membership set first_name  = $1 , last_name =$2  where email = $3",
      [first_name, last_name, req.userData.email],
    );

    const rows = await balikinDataMemberByEmail(pool, req);

    res.status(200).json({
      status: 200,
      message: "Sukses",
      data: rows[0],
    });
  } catch (err) {
    next(err);
  }
};

export const updateProfileImage = async (req, res, next) => {
  try {
    const gambarCloudUri = getDataUri(req.file);
    const uploadImageCloud = await dataFuncCloudinary.uploader.upload(
      gambarCloudUri.content,
      { folder: "dummy" },
      (err) => {
        try {
          if (err) throw new HttpError("gagal upload diCloudinary", 400);
        } catch (err) {
          next(err);
        }
      },
    );

    await pool.query(
      "update membership set profile_image = $1 where email = $2",
      [uploadImageCloud.secure_url, req.userData.email],
    );

    const rowsUpdateImage = await balikinDataMemberByEmail(pool, req);

    res.status(200).json({
      status: 200,
      message: "Sukses",
      data: rowsUpdateImage,
    });
  } catch (err) {
    next(err);
  }
};
