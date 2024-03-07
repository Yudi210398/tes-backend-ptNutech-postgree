import HttpError from "../init/http-error.js";

export const refaktorResponeTopup = async (res, findUser) => {
  return res.status(200).json({
    status: 200,
    message: "Sukses",
    data: {
      balance: findUser[0].balance,
    },
  });
};

export const balikinDataMemberByEmail = async (pool, req) => {
  const { rows } = await pool.query(
    "SELECT first_name, last_name, email, profile_image FROM membership WHERE email = $1",
    [req.userData.email]
  );

  if (!rows[0]) throw new HttpError("User tidak ditemukan", 404);

  return rows;
};

export const balikinDataMemberByEmailBalance = async (pool, req) => {
  const { rows } = await pool.query(
    "SELECT balance FROM membership WHERE email = $1",
    [req.userData.email]
  );

  if (!rows[0]) throw new HttpError("User tidak ditemukan", 404);
  return rows;
};
