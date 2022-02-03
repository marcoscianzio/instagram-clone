import { FormControl, FormErrorMessage, Input } from "@chakra-ui/react";
import { useField } from "formik";

type FieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  placeholder: string;
};

const Field: React.FC<FieldProps> = ({ placeholder, size: _, ...props }) => {
  const [field, { error }] = useField(props);

  return (
    <FormControl isInvalid={!!error}>
      <Input {...field} {...props} id={field.name} placeholder={placeholder} />
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
};

export default Field;
