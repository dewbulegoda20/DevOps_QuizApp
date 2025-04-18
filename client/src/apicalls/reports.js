import API_BASE_URL from "../config";
const { default: axiosInstance } = require(".");

// add report
export const addReport = async (payload) => {
    try {
        const response = await axiosInstance.post(`${API_BASE_URL}/api/reports/add-report`, payload);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

// get all reports
export const getAllReports = async (filters) => {
    try {
        const response = await axiosInstance.post(`${API_BASE_URL}/api/reports/get-all-reports` , filters);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
} 

// get all reports by user
export const getAllReportsByUser = async () => {
    try {
        const response = await axiosInstance.post(`${API_BASE_URL}/api/reports/get-all-reports-by-user`);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}