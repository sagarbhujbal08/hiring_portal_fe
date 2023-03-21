import axios from 'axios';
const basepath = 'https://tan-camel-wear.cyclic.app/opening/'
// const basepath = 'http://localhost:5000/opening/'
export async function createOpening(data) {
    const response = await axios.post(`${basepath}create`, data);
    return response.data;
}

export async function updateOpening(data) {
    const response = await axios.put(`${basepath}update`, data);
    return response.data;
}

export async function deleteOpening(data) {
    const response = await axios.delete(`${basepath}delete?id=${data._id}`);
    return response.data;
}

export async function getAllOpenings() {
    try{
        const response = await axios.get(`${basepath}getAll`);
        return response.data;
    }catch(error) {
        return [];
    }
}