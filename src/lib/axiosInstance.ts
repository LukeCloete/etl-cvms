import { cookies } from "next/headers";
import axios, { Method } from "axios";

interface AxiosInstanceProps {
  url: string;
  method: Method;
}

const axiosInstance = async ({ url, method }: AxiosInstanceProps) => {
  const sessionCookie = cookies().get("session");
  const headers = {
    Cookie: `session=${sessionCookie?.value}`,
  };
  return axios({
    url,
    method,
    headers,
  });
};

export default axiosInstance;
