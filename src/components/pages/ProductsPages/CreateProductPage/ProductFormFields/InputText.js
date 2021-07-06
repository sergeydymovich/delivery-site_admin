import { TextField } from "@material-ui/core";
import { Controller } from "react-hook-form";


function InputText({ field, control, className }) {
  
  return (
    <Controller
    name={field.name}
    control={control}
    rules={{ required: true }}
    render={({ props, field: { value, onChange } }) => (
      <TextField
        {...props}
        label={field.label}
        variant="outlined"
        color="primary"
        onChange={onChange}
        value={value}
        className={className}
      />
    )}
  />  
  );
}

export default InputText;