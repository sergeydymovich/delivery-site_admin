import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { deleteField } from "reducers/fieldsSlice";
import { fetchDeleteField } from "api/api";
import FieldsTableRow from "components/pages/FieldsPages/FieldsList/FieldsTableRow";



function FieldsTable() {
  const fields = useSelector((state) => state.fields.fieldsArr);
  const pizzaSizesLength = useSelector((state) => state.pizzaSizes.pizzaSizesArr).length;
  const dispatch = useDispatch();

  const handleDeleteField = (id) => { 
    fetchDeleteField({ _id: id })
    .then((res) => {
      dispatch(deleteField(id));
    })
    .catch((err) => {
      console.log(err);
    });
  }

  return (
    <TableContainer>
    <Table aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Название поля</TableCell>
          <TableCell>Описание</TableCell>
          <TableCell>Единица исчисления/измерения</TableCell>
          <TableCell>Базовое поле(для всех продуктов)</TableCell>
          <TableCell>Инструменты</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {fields.map((field) => (
          <FieldsTableRow
            key={field._id}
            field={field}
            handleDeleteField={handleDeleteField}
            pizzaSizes={pizzaSizesLength}
          />
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  );
}

export default FieldsTable;