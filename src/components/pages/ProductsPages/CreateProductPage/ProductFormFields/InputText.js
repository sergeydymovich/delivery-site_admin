import {  makeStyles, TextField } from "@material-ui/core";
import { Controller } from "react-hook-form";

const useStyles = makeStyles((theme) => ({

}));

function InputText({ control }) {
  const classes = useStyles();

  return (
    <Controller
    name="name"
    control={control}
    rules={{ required: true }}
    className={classes.field}
    render={({ field, fieldState: { error } }) => (
      <TextField
        {...field}
        error={!!error}
        label="Text"
        variant="outlined"
        color="primary"
      />
    )}
  />  
  );
}

export default InputText;