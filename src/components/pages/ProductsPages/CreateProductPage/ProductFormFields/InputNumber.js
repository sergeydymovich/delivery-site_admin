import {  makeStyles, TextField } from "@material-ui/core";
import { Controller } from "react-hook-form";

const useStyles = makeStyles((theme) => ({

}));

function InputNumber({ control }) {
  const classes = useStyles();

  return (
    <Controller
    name="number"
    control={control}
    rules={{ required: true }}
    className={classes.field}
    render={({ field, fieldState: { error } }) => (
      <TextField
        {...field}
        error={!!error}
        label="Number"
        variant="outlined"
        color="primary"
      />
    )}
  />  
  );
}

export default InputNumber;