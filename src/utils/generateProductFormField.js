import InputNumber from 'components/pages/ProductsPages/CreateProductPage/ProductFormFields/InputNumber';
import InputText from 'components/pages/ProductsPages/CreateProductPage/ProductFormFields/InputText';

export const generateProductFormField = ({ field, control}) => {

  switch (field.ui_type) {
    case 'INPUT_TEXT':
     return <InputText control={control} />;
    case 'INPUT_NUMBER':
      return <InputNumber control={control} />;
    default:
     return <p>неизвестный тип</p>;
  }
 }