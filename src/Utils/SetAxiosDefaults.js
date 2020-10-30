import axios from "axios";

const setAxiosDefaults = (token) => {
  axios.defaults.baseURL = "http://localhost:5002";

  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (
        error.response.status === 401 &&
        window.location.pathname !== "/signin" &&
        window.location.pathname !== "/accountrecovery" &&
        window.location.pathname.includes("/resetpassword")
      ) {
        // window.location.reload();
        console.log("placeholder");
      }
      return error;
    }
  );
};

export default setAxiosDefaults;
