import axios from "axios";

// 기본 URL 지정
axios.defaults.baseURL = import.meta.env.VITE_APP_API_BASE_URL;

// 기본 header지정(post와 put만 적어도 돼서 두 개만 작성)
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.put["Content-Type"] = "application/json";

axios.defaults.timeout = 20000;

// 토큰 불러오기(로그인 시 localStorage에 저장된 Token값을 불러오기)
const getToken = () => {
  return localStorage.getItem("userToken");
};

// GET (경로는 'baseURL/path'가 된다.)
export const get = async (path, params) => {
  return await axios.get(path, { params });
};

// POST (경로는 'baseURL/path'가 된다.)
export const post = async (path, data) => {
  return await axios.post(path, data);
};

// PUT (경로는 'baseURL/path'가 된다.)
export const put = async (path, data) => {
  return await axios.put(path, data);
};

// DELETE (경로는 'baseURL/path'가 된다.)
export const del = async (path, data) => {
  return await axios.delete(path, data);
};

// clinet ---- [ interceptor ]-----> back-end
axios.interceptors.request.use(
  (req) => {
    if (req.data instanceof FormData) {
      req.headers["Content-Type"] = "multipart/form-data";
    }
    const token = getToken();
    req.headers.Authorization = `Bearer ${token}`;

    return req;
  },
  (err) => {
    console.log("axios에서 일어나는 모든 request 에러", err);
    return Promise.reject(err);
  }
);

// clinet <---- [ interceptor ] ------ back-end
axios.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    return Promise.reject(err);
  }
);
