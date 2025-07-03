'use client'
import axios, { AxiosRequestConfig } from "axios";
const API_URL = "http://localhost:3000/";

export async function loginApi(data: { email: string; password: string; }) {
  try {
    const response = await axios.post(
      `${API_URL}auth/login`,
      data
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function registerApi(data: { email: string; password: string; }) {
  console.log(data)
  try {
    const response = await axios.post(
      `${API_URL}auth/register`,
      data
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
export async function generateOtp(email: string) {
  try {
    const response = await axios.post(`${API_URL}auth/generate-otp`, { email })
    return response.data;
  } catch (error) {
    console.error(error)
    throw error;
  }
}
export async function verifyOTP(email: string, otp: string | number) {
  try {
    const response = await axios.post(`${API_URL}auth/verify-otp`, { email, otp })
    return response.data;
  } catch (error) {
    console.error(error)
    throw error;
  }
}


export async function renewAccessToken() {
  const refreshToken = localStorage.getItem('refreshToken');
  try {
    if (refreshToken) {
      const res = await axios.post(`${API_URL}auth/refresh-token`, { refreshToken });
      localStorage.setItem('accessToken', res.data.accessToken);
      return res.data.accessToken;
    } throw new Error('No refresh token');
  }
  catch (err) {
    throw err
  }
}

// export async function apiRequest(config: AxiosRequestConfig) {
//   let accessToken = localStorage.getItem('accessToken');
//   try {
//     const response = await axios({
//       ...config,
//       headers: {
//         ...(config.headers || {}),
//         Authorization: `Bearer ${accessToken}`,
//       },
//     });
//     return response;
//   } catch (err: any) {
//     if (err.response && err.response.status === 401) {
//       accessToken = await renewAccessToken();
//       const retryResponse = await axios({
//         ...config,
//         headers: {
//           ...(config.headers || {}),
//           Authorization: `Bearer ${accessToken}`,
//         },
//       });
//       return retryResponse;
//     }
//     throw err;
//   }
// }

function parseJwt(token: string) {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch {
    return null;
  }
}

export function scheduleTokenRenewal() {
  console.log("jwt r")
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) return;
  const payload = parseJwt(accessToken);
  if (!payload || !payload.exp) return;
  const expiresInMs = payload.exp * 1000 - Date.now();
  const renewIn = expiresInMs - 60 * 1000;
  if (renewIn > 0) {
    const tId=setTimeout(async () => {
      try {
        await renewAccessToken();
        scheduleTokenRenewal();
      } catch (err) {
        console.error('Token renewal failed', err);
      }
    }, renewIn);
    console.log(tId,'timeOut')
  }
}
// scheduleTokenRenewal()