import React, { useEffect } from "react";
import CreateCategoryForm from "./CreateCategoryForm";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "reducers/categoriesSlice";
import { fetchGetCategories } from "api/api";
import CreateIcon from "@material-ui/icons/Create";
import {
  Container,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";

function CategoriesPage() {
  const categories = useSelector((s) => s.categories.categoriesArr);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchGetCategories()
      .then((res) => {
        const { categories } = res.data;
        dispatch(getCategories(categories));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dispatch]);

  return (
    <Container maxWidth="xl">
      <CreateCategoryForm />
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Название</TableCell>
              <TableCell align="right">Дата создания</TableCell>
              <TableCell align="right">Инструменты</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category._id}>
                <TableCell component="th" scope="row">
                  {category.name}
                </TableCell>
                <TableCell align="right">
                  {new Date(category.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell component="th" align="right" scope="row">
                  <IconButton aria-label="change">
                    <CreateIcon aria-label="change" size="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default CategoriesPage;
