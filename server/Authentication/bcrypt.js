import bcrypt from "bcrypt";

export const hashUserPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(5);
    const hashPassword = await bcrypt.hash(password, salt);
    return hashPassword;
  } catch (error) {
    console.log(error);
  }
};
export const varifyPassword = async (userPassword, password) => {
  try {
    const vaifry = await bcrypt.compare(password, userPassword);
    return vaifry;
  } catch (error) {
    console.log(error);
  }
};
