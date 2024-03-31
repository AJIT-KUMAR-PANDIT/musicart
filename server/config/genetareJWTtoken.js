import jwt from "jsonwebtoken";

export const generateJwtToken = async (userId) => {
  const token = await jwt.sign({ id: userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: "30d",
  });
  return token;
};
