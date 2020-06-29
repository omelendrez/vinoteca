import React, { useState, useEffect } from "react";
import Notification from "../common/Notification";
import Loading from "../common/Loading";
import Container from "../common/Container";
import TableItem from "../common/TableItem";
import TableItemField from "../common/TableItemField";
import { getCategories } from "../../services/categories";
import { formatDateFull } from "../../helpers";

const Categories = () => {
  const [categories, setCategories] = useState({ rows: [] });
  const [alert, setAlert] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getCategories()
      .then((categories) => {
        setCategories(categories);
        setIsLoading(false);
      })
      .catch((error) => {
        setAlert({ message: error.message, type: "is-danger" });
        setIsLoading(false);
      });
  }, []);

  const clearAlert = () => {
    setAlert({});
  };

  const handleEdit = (e, categories) => {
    e.preventDefault();
    console.log(categories);
  };

  const handleDelete = (e, categories) => {
    e.preventDefault();
    console.log(categories);
  };

  const { rows } = categories;
  return (
    <>
      {alert.message && (
        <Notification
          message={alert.message}
          clear={clearAlert}
          type={alert.type}
        />
      )}

      <Container
        title="Categorias"
        subTitle="Admnistración de categorias"
        width="is-6"
        background="is-primary"
      >
        {rows &&
          rows.map((category, index) => {
            const { code, name, created } = category;
            return (
              <TableItem
                key={index}
                item={category}
                itemHeader={name}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              >
                <TableItemField label="Código" value={code} />
                <br />
                <TableItemField
                  icon="fa fa-calendar-alt mr-2"
                  value={formatDateFull(created)}
                />
              </TableItem>
            );
          })}
      </Container>

      {!rows.length && (
        <Notification
          message="La tabla no contiene registros"
          type="is-light"
          clear={clearAlert}
        />
      )}

      {isLoading && <Loading />}
    </>
  );
};

export default Categories;
