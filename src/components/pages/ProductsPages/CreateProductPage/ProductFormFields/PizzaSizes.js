import { Box, Checkbox, FormControlLabel, makeStyles, TextField, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";

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
  pizzaSizeName: {
    textTransform: 'capitalize',
    marginBottom: '10px'
  },
}));

function PizzaSizes({ pizzaSizes, handleChangePizzaSizes }) {
  const [pizzaArr, setPizzaArr] = useState([]);
  const classes = useStyles();

  const handleChangePizzaPrice = (price, sizeId) => {
    const updatedPizzaArr = pizzaArr.map((pizzaSize) => (
      pizzaSize._id === sizeId ? {...pizzaSize, price} : pizzaSize
    ))
    setPizzaArr(updatedPizzaArr);
  }

  const toggleIncludeDough = (sizeId, doughName) => {
    const updatedPizzaArr = pizzaArr.map((size) => {
        if (size._id === sizeId) {
          return {...size, dough: size.dough.map((doughItem) => (
            doughItem.name === doughName ? {...doughItem, is_active: !doughItem.is_active} : doughItem
          ))
          }  
        } else {
          return size
        }       
      })
    setPizzaArr(updatedPizzaArr);
  }

  const handleChangeDoughWeight = (weight, sizeId, doughName) => {
    const updatedPizzaArr = pizzaArr.map((size) => {
       if (size._id === sizeId) {
        return {...size, dough: size.dough.map((doughItem) => (
          doughItem.name === doughName ? {...doughItem, weight} : doughItem
        ))
        }
       } else {
         return size
       }   
    })
    setPizzaArr(updatedPizzaArr);
  }

  useEffect(() => {
    setPizzaArr(pizzaSizes);
  }, [pizzaSizes]);

  useEffect(() => {
    if (pizzaArr.length) {
      handleChangePizzaSizes(pizzaArr);
    }
  }, [JSON.stringify(pizzaArr)]);
 
  return (
    <Box className={classes.pizzaSizes}>
    {pizzaArr.map((pizzaSize) => (
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
            onChange={(e) => handleChangePizzaPrice(e.target.value, pizzaSize._id)}
            value={pizzaSize.price ?? ''}
          />
        </Box>
        <Box className={classes.pizzaDough}>
          {pizzaSize.dough.map((dough) => (
            <Box className={classes.traditionalDough}>
              <FormControlLabel
                className={classes.pizzaDoughLabel}
                control={
                <Checkbox
                  size='small'
                  color="primary"
                  onChange={() => toggleIncludeDough(pizzaSize._id, dough.name)}
                  checked={dough.is_active ?? false}
                />}
                label={dough.name}
                labelPlacement="end"
              />
              <TextField
                className={classes.pizzaWeight}
                label="Вес(гр)"
                variant="outlined"
                color="primary"
                size='small'
                onChange={(e) => handleChangeDoughWeight(e.target.value, pizzaSize._id, dough.name)}
                value={dough.weight ?? ''}
                disabled={!dough.is_active}
              />
            </Box>
          ))}
        </Box>
      </Box>
    ))}
  </Box> 
  );
}

export default PizzaSizes;