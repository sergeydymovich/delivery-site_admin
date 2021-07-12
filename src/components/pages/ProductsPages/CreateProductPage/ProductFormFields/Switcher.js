import { FormControlLabel, Switch } from "@material-ui/core";
import { Controller } from "react-hook-form";


function Switcher({ name, label, control }) {
  
  return (
    <Controller
    name={name}
    control={control}
    render={({ field }) => (
      <FormControlLabel
        control={<Switch checked={field.value ?? true} color="primary" {...field} />}
        label={label}
        labelPlacement='top'
      />
    )}
/>  
  );
}

export default Switcher;