import axios from 'axios';

const PRODUCT_URL='http://localhost:9898/inventory/product';
const ID_URL='http://localhost:9898/inventory/id-gen';
 
export const addProduct = (product) => {
    return axios.post(PRODUCT_URL,product);
}
export const productIdGenerate = () => {
    return axios.get(ID_URL);
}
export const getProductById = (id) => {
    return axios.get(PRODUCT_URL+ '/' + id);
}
export const getAllProducts = () => {
    return axios.get(PRODUCT_URL);
}
export const deleteProduct = (id) => {
    return axios.delete(PRODUCT_URL+ '/' + id);
}
export const stockUpdate = (product,qty,flag) => {
    return axios.put(PRODUCT_URL+'/'+qty+'/'+flag, product);
}
export const priceUpdate = (product) => {
    return axios.put(PRODUCT_URL, product);
}


