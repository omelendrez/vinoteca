import api from "./api";
import { handleError } from "../helpers";

export const getPrices = (search) => {
  return new Promise((resolve, reject) => {
    api
      .get(`prices?search=${search}`)
      .then((response) => resolve(response.data))
      .catch((error) => reject(handleError(error)));
  });
};

export const addPrice = (price) => {
  return new Promise((resolve, reject) => {
    api
      .post("prices", price)
      .then((response) => resolve(response.data))
      .catch((error) => reject(handleError(error)));
  });
};

export const savePrice = (price) => {
  return new Promise((resolve, reject) => {
    api
      .put(`prices/${price.id}`, price)
      .then((response) => resolve(response.data))
      .catch((error) => reject(handleError(error)));
  });
};

export const deletePrice = (price) => {
  return new Promise((resolve, reject) => {
    api
      .delete(`prices/${price.id}`)
      .then((response) => resolve(response.data))
      .catch((error) => reject(handleError(error)));
  });
};
