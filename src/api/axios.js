/* eslint-disable no-debugger */
import store from "@/store";
import axios from "axios";

const baseURL = "https://dev.moydomonline.ru/api/";
const instance = axios.create({
  baseURL,
});
if (localStorage.getItem("token")) {
  instance.defaults.headers.common["Authorization"] = `Token ${
    localStorage.getItem("token") || ""
  }`;
}

instance.interceptors.request.use(
  (config) => {
    if (localStorage.getItem("token")) {
      config.headers["Authorization"] = `Token ${
        localStorage.getItem("token") || ""
      }`;
    }
    return config;
  },
  (error) => {
    console.error("Failed sending request!");
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    if (response.config.isMsgSuccess) {
      store.dispatch("notification/addNotification", {
        notification: {
          type: "success",
          message: response.config.msgSuccess || "Успешно",
        },
        duration: 4000,
      });
    }
    return response;
  },
  (error) => {
    const handleError = (msg) => {
      store.dispatch("notification/addNotification", {
        notification: {
          type: "error",
          message: msg || "Неизвестная ошибка",
        },
        duration: 4000,
      });
    };
    if (error.response && error.response.data && error.response.data.detail) {
      let errorData = error.response.data?.data || error.response.data.detail;
      let concatMsgErr = "";
      if (typeof errorData == "object" && Object.keys(errorData).length) {
        errorData = Object.values(errorData);
        errorData.forEach((item) => {
          concatMsgErr += `${item}\n`;
        });
        handleError(concatMsgErr);
        return;
      }
      handleError(errorData);
    } else {
      handleError();
    }

    return Promise.reject(error);
  }
);

export default instance;
