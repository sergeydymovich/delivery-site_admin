import { Chip } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

function MultiSelect({ className, ingredients, handleChange, stateIngredients, label }) {
  
  return (
      <Autocomplete
        className={className}
        multiple
        id="tags-filled"
        options={ingredients}
        getOptionLabel={(option) => option.name}
        onChange={handleChange}
        defaultValue={stateIngredients}
        filterSelectedOptions
        freeSolo
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip variant="outlined" label={option.name} {...getTagProps({ index })} />
          ))
        }
        renderInput={(params) => (
          <TextField {...params} variant="outlined" label={label} placeholder="добавить..." />
        )}
      />
  );
}

export default MultiSelect;