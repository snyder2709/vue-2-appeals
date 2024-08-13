import axios from "@/api/axios";

export const login = async (data) =>
  await axios.post("/auth/login/", data, {
    isMsgSuccess: true,
    msgSuccess: "Вход выполнен",
  });
