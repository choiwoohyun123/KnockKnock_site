import * as Api from "../api";
export const login = async ({ email, password }) => {
  const result = await Api.post("users/login", {
    email,
    password,
  });
  return result.data;
};
