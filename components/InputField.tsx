import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { useField } from "formik";
import { InputHTMLAttributes } from "react";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  placeholder: string;
  label: string;
  type: string;
  isRequired?: boolean;
  textarea?: boolean;
};

export const InputField: React.FC<InputFieldProps> = ({
  label,
  placeholder,
  type,
  isRequired,
  textarea,
  ...props
}) => {
  const [field, { error }] = useField(props);
  let InputorTextArea = Input;
  if (textarea) {
    InputorTextArea = Textarea;
  }
  return (
    <FormControl isInvalid={error ? true : false}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <InputorTextArea
        {...field}
        id={field.name}
        placeholder={placeholder}
        type={type}
        required={isRequired}
      />
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};
