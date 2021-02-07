import { FieldError } from "../generated/graphql";

const toErrorMap = (errors: FieldError[]) => {
  const errorMap: Record<string, string> = {};
  errors.forEach(({ field, message }) => {
    errorMap[field.toLowerCase()] = message;
  });
  return errorMap;
};

export default toErrorMap;
