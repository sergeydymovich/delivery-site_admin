import React from "react";
import CreateIcon from "@material-ui/icons/Create";
import {
  Avatar,
  IconButton,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { changeActivePage } from 'reducers/productsSlice';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
  imageWrapper: {
    marginRight: "auto",
    marginLeft: "auto",
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '30px',
  }
}));

function ProductsTable() {
  const products = useSelector((state) => state.products.productsArr);
  const activePage = useSelector((state) => state.products.requestOptions.activePage);
  const pagesAmount = useSelector((state) => state.products.requestOptions.pagesAmount);
  const classes = useStyles();
  const dispatch = useDispatch();

  const handlePageChange = (event, value) => {
   dispatch(changeActivePage(value));
  };

  return (
    <TableContainer>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Название</TableCell>
            <TableCell align="center">Фото</TableCell>
            <TableCell align="right">Цена</TableCell>
            <TableCell align="right">Вес</TableCell>
            <TableCell align="right">Категория</TableCell>
            <TableCell align="right">Ингредиенты</TableCell>
            <TableCell align="right">Доп. Ингредиенты</TableCell>
            <TableCell align="right">Дата создания</TableCell>
            <TableCell align="right">Инструменты</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product._id}>
              <TableCell component="th" scope="row">
                {product.name}
              </TableCell>
              <TableCell component="th" align="center" scope="row">
                <Avatar
                  className={classes.imageWrapper}
                  alt="extra-ingredient"
                  src={product.imageSrc}
                />
              </TableCell>
              <TableCell component="th" align="right" scope="row">
                {product.price}
              </TableCell>
              <TableCell component="th" align="right" scope="row">
                {product.weight} гр.
              </TableCell>
              <TableCell component="th" align="right" scope="row">
                {product.category.name}
              </TableCell>
              <TableCell component="th" align="right" scope="row">
                {product.ingredients.map((ingredient) => ingredient.name + ",")}
              </TableCell>
              <TableCell component="th" align="right" scope="row">
                {product.extraIngredients.map((ingredient) => ingredient.name + ",")}
              </TableCell>
              <TableCell align="right">
                {new Date(product.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell component="th" align="right" scope="row">
              <Link
                to={{
                  pathname: "/products/change",
                  state: {
                    product
                  },
                }}
              >
                <IconButton aria-label="change">
                  <CreateIcon aria-label="change" size="small" />
                </IconButton>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination
        className={classes.pagination}
        count={pagesAmount}
        page={activePage}
        onChange={handlePageChange}
      />
  </TableContainer>
  );
}

export default ProductsTable;