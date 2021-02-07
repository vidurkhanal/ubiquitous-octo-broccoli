import { FieldError } from "../generated/graphql";

let toErrorMap;
export default toErrorMap = (errors: FieldError[]) => {
  const errorMap: Record<string, string> = {};
  errors.forEach(({ field, message }) => {
    errorMap[field.toLowerCase()] = message;
  });
  return errorMap;
};
