import React, { useEffect } from "react";
import CreateExtraIngredientForm from "./CreateExtraIngredientForm";
import { useDispatch, useSelector } from "react-redux";
import { getExtraIngredients } from "reducers/extraIngredientsSlice";
import { fetchGetExtraIngredients } from "api/api";
import CreateIcon from "@material-ui/icons/Create";
import {
  Avatar,
  Container,
  IconButton,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  imageWrapper: {
    marginRight: "auto",
    marginLeft: "auto",
  },
}));

function ExtraIngredientsPage() {
  const ingredients = useSelector(
    (s) => s.extraIngredients.extraIngredientsArr
  );
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    fetchGetExtraIngredients()
      .then((res) => {
        const { ingredients } = res.data;
        dispatch(getExtraIngredients(ingredients));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dispatch]);

  return (
    <Container maxWidth="xl">
      <CreateExtraIngredientForm />
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Название</TableCell>
              <TableCell align="center">Фото</TableCell>
              <TableCell align="right">Цена</TableCell>
              <TableCell align="right">Дата создания</TableCell>
              <TableCell align="right">Инструменты</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ingredients.map((ingredient) => (
              <TableRow key={ingredient._id}>
                <TableCell component="th" scope="row">
                  {ingredient.name}
                </TableCell>
                <TableCell component="th" align="center" scope="row">
                  <Avatar
                    className={classes.imageWrapper}
                    alt="extra-ingredient"
                    src={ingredient.imageSrc}
                  />
                </TableCell>
                <TableCell component="th" align="right" scope="row">
                  {ingredient.price}
                </TableCell>
                <TableCell align="right">
                  {new Date(ingredient.createdAt).toLocaleDateString()}
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

export default ExtraIngredientsPage;
