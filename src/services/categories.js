import api from "./api";
import { handleError } from "../helpers";

export const getCategories = () => {
  return new Promise((resolve, reject) => {
    api
      .get("categories")
      .then((response) => resolve(response.data))
      .catch((error) => reject(handleError(error)));
  });
};

export const addCategory = (category) => {
  return new Promise((resolve, reject) => {
    api
      .post("categories", category)
      .then((response) => resolve(response.data))
      .catch((error) => reject(handleError(error)));
  });
};

export const saveCategory = (category) => {
  return new Promise((resolve, reject) => {
    api
      .put(`categories/${category.id}`, category)
      .then((response) => resolve(response.data))
      .catch((error) => reject(handleError(error)));
  });
};

export const deleteCategory = (category) => {
  return new Promise((resolve, reject) => {
    api
      .delete(`categories/${category.id}`)
      .then((response) => resolve(response.data))
      .catch((error) => reject(handleError(error)));
  });
};
