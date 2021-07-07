import { Box, Checkbox, FormControlLabel, makeStyles, TextField, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  pizzaSizeWrapper: {
    display: 'flex',
    justifyContent: 'space-around',
    border: `1px solid ${theme.palette.grey[400]}`,
    borderRadius: '4px',
    padding: '10px',
    marginBottom: '7px',
    "&:last-child": {
      marginBottom: '0'
    }
  },
  pizzaSizeMainInfo: {
    width: '200px',
    marginRight: '25px',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  pizzaDough: {
    width: '100%',
  },
  pizzaWeight: {
    width: '100px',
  },
  pizzaDoughLabel: {
    minWidth: '170px',
  },
  traditionalDough: {
    display: 'flex',
    width: '100%',
    marginRight: '10px',
    marginBottom: '10px',
  },
  thinDough: {
    display: 'flex',
    width: '100%',
  },
  pizzaSizeName: {
    textTransform: 'capitalize',
    marginBottom: '10px'
  },
}));

function PizzaSizes({ pizzaSizes }) {
  const classes = useStyles();
  
  return (
    <Box className={classes.pizzaSizes}>
    {pizzaSizes.map((pizzaSize) => (
      <Box className={classes.pizzaSizeWrapper}>
        <Box className={classes.pizzaSizeMainInfo}>
          <Typography className={classes.pizzaSizeName} component="p">
            {`${pizzaSize.name}(${pizzaSize.size}см)`}
          </Typography>
          <TextField
            label="Цена"
            variant="outlined"
            color="primary"
            size='small'
          />
        </Box>
        <Box className={classes.pizzaDough}>
          <Box className={classes.traditionalDough}>
            <FormControlLabel
              className={classes.pizzaDoughLabel}
              control={<Checkbox size='small' color="primary" />}
              label="Традиционное:"
              labelPlacement="end"
            />
            <TextField
              className={classes.pizzaWeight}
              label="Вес"
              variant="outlined"
              color="primary"
              size='small'
            />
          </Box>
          <Box className={classes.thinDough}>
            <FormControlLabel
              className={classes.pizzaDoughLabel}
              control={<Checkbox size='small' color="primary" />}
              label="Тонкое:"
              labelPlacement="end"
            />
            <TextField
              className={classes.pizzaWeight}
              label="Вес"
              variant="outlined"
              color="primary"
              size='small'
            />
          </Box>
        </Box>
      </Box>
    ))}
  </Box> 
  );
}

export default PizzaSizes;