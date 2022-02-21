import {
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  InputProps,
  Textarea,
} from "@chakra-ui/react";
import { useField } from "formik";
import { InputHTMLAttributes, ReactNode } from "react";

type InputFieldProps = InputProps &
  InputHTMLAttributes<HTMLInputElement> & {
    name: string;
    children?: ReactNode;
    placeholder?: string;
    textArea?: boolean;
  };

const InputField: React.FC<InputFieldProps> = ({
  textArea,
  placeholder,
  children,
  size: _,
  ...props
}) => {
  const [field, { error, touched }] = useField(props);

  const Component = (textArea ? Textarea : Input) as React.ElementType;

  return (
    <FormControl isInvalid={!!error && touched}>
      <InputGroup>
        <Component
          {...field}
          {...props}
          id={field.name}
          placeholder={placeholder ? placeholder : field.name}
        />
        {children}
      </InputGroup>
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
};

export default InputField;
