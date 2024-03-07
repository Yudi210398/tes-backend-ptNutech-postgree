import HttpError from "../init/http-error.js";

import { v4 as uuidv4 } from "uuid";

import { validationResult } from "express-validator";

import { pool } from "../init/configurasiPostgres.js";
import { balikinDataMemberByEmailBalance } from "../func/fungsiRefactor.js";

export const getBalance = async (req, res, next) => {
  try {
    const { rows } = await pool.query(
      "SELECT balance FROM membership WHERE email = $1",
      [req.userData.email]
    );

    if (!rows[0]) throw new HttpError("User tidak ditemukan", 404);

    res.status(200).json({
      status: 200,
      message: "Sukses",
      data: rows,
    });
  } catch (err) {
    next(err);
  }
};

export const transaction = async (req, res, next) => {
  try {
    const { service_code } = req.body;
    const generteinvoice = uuidv4();
    const error = validationResult(req);

    if (!error.isEmpty()) throw new HttpError(error.array()[0 ?? 1].msg, 400);

    await pool.query("BEGIN");
    const findEmail = await balikinDataMemberByEmailBalance(pool, req);

    const cariService = await pool.query(
      "SELECT * FROM infomasiService WHERE service_code = $1",
      [service_code?.toUpperCase()]
    );

    if (cariService?.rows.length === 0)
      throw new HttpError("Service ataus Layanan tidak ditemukan", 400);

    if (+findEmail[0].balance < +cariService?.rows[0].service_tariff)
      throw new HttpError("Balace/Saldo anda tidak cukup", 400);

    await pool.query(
      "UPDATE membership SET balance = balance - $1 WHERE email = $2",
      [+cariService?.rows[0].service_tariff, req.userData.email]
    );
    await pool.query(
      "INSERT INTO transaction (invoice, email, description, transaction_type, total_amount, service_code) VALUES ($1, $2, $3, $4, $5, $6)",
      [
        generteinvoice,
        req.userData.email,
        cariService?.rows[0].service_name,
        "PAYMENT",
        +cariService?.rows[0].service_tariff,
        cariService?.rows[0].service_code,
      ]
    );
    res.status(200).json({
      status: 200,
      message: "Sukses",
      data: {
        invoice_number: generteinvoice,
        service_code: cariService?.rows[0].service_code,
        service_name: cariService?.rows[0].service_name,
        transaction_type: "PAYMENT",
        total_amount: +cariService?.rows[0].service_tariff,
        created_on: new Date(),
      },
    });
    await pool.query("COMMIT");
  } catch (err) {
    await pool.query("ROLLBACK");
    next(err);
  }
};

export const getHistoryTransaction = async (req, res, next) => {
  try {
    const { rows } = await pool.query(
      `SELECT * FROM transaction WHERE email = $1`,
      [req.userData.email]
    );
    const { offset, limit } = req.query;

    if (rows.length === 0)
      throw new HttpError("belum ada history Transaksi", 400);

    const start = offset;
    const end = offset + limit;
    const hasil =
      limit === 0 || !limit ? rows.reverse() : rows.reverse().slice(start, end);

    res.status(200).json({
      status: 200,
      message: "Sukses",
      data: hasil,
    });
  } catch (err) {
    next(err);
  }
};

export const topUp = async (req, res, next) => {
  try {
    const { top_up_amount } = req.body;

    //* Cari user membership by email

    await pool.query("BEGIN");

    const findEmail = await balikinDataMemberByEmailBalance(pool, req);

    const error = validationResult(req);

    if (!error.isEmpty()) throw new HttpError(error.array()[0 ?? 1].msg, 400);

    await pool.query(
      " INSERT INTO transaction (invoice, email, description, transaction_type, total_amount) VALUES ($1, $2, $3, $4,$5)",
      [uuidv4(), req.userData.email, "Top Up Balance", "TOPUP", top_up_amount]
    );

    await pool.query(
      "UPDATE membership SET balance = balance + $1 WHERE email = $2",
      [top_up_amount, req.userData.email]
    );

    res.status(200).json({
      status: 200,
      message: "Sukses",
      data: { saldo: +findEmail[0].balance + +top_up_amount },
    });
    await pool.query("COMMIT");
  } catch (err) {
    await pool.query("ROLLBACK");
    next(err);
  }
};
