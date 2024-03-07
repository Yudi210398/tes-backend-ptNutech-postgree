import { pool } from "../init/configurasiPostgres.js";
import HttpError from "../init/http-error.js";

export const getBaner = async (req, res, next) => {
  try {
    const { rows } = await pool.query("SELECT * FROM informasibanner");

    if (rows.length === 0) throw new HttpError("banner tidak ada", 401);
    res.status(200).json({
      status: 200,
      message: "Sukses",
      data: rows,
    });
  } catch (err) {
    next(err);
  }
};

export const getService = async (req, res, next) => {
  try {
    const { rows } = await pool.query("SELECT * FROM infomasiService");

    if (rows.length === 0) throw new HttpError("service tidak ada", 401);

    res.status(200).json({
      status: 200,
      message: "Sukses",
      data: rows,
    });
  } catch (err) {
    next(err);
  }
};
