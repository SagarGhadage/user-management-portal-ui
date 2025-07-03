import axios from "axios";
const API_URL = "http://localhost:3000/";
import type { AxiosRequestConfig, ResponseType } from "axios";

const generateHeader = (type: string): AxiosRequestConfig => {
    const header: AxiosRequestConfig = {
        headers: {
            "Content-Type": type == "upload"
                ? "multipart/form-data"
                : type == "download"
                    ? "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                    : "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
    };
    if (type == "download") {
        return {
            ...header,
            responseType: "blob" as ResponseType,
        };
    }
    return header;
};

export async function getUsers() {
    try {
        const response = await axios.get(
            `${API_URL}users`, generateHeader('')
        );
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
export async function getUser(id: string) {
    console.log(id)
    try {
        const response = await axios.get(
            `${API_URL}users/${id}`, generateHeader('')
        );
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function fileUpload(data:any) {
    console.log(data)
    try {
        const response = await axios.post(
            `${API_URL}file-upload`, data, generateHeader('upload')
        );
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function deleteUser(id: string) {
    try {
        const response = await axios.delete(`${API_URL}users/${id}`, generateHeader(''))
        return response.data;
    } catch (error) {
        console.error(error)
        throw error;
    }
}