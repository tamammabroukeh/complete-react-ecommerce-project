import { FocusEvent } from "react";
import { Form } from "react-bootstrap";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";

type TFormInput<TFieldValue extends FieldValues> = {
  label: string;
  type?: string;
  name: Path<TFieldValue>;
  register: UseFormRegister<TFieldValue>;
  error: string;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  formText?: string;
  success?: string;
  disabled?: boolean;
};

const Input = <TFieldValue extends FieldValues>({
  label,
  type = "text",
  name,
  error,
  register,
  onBlur,
  formText,
  success,
  disabled,
}: TFormInput<TFieldValue>) => {
  const onBlurHandler = (event: FocusEvent<HTMLInputElement>) => {
    if (onBlur) {
      onBlur(event);
      register(name).onBlur(event);
    } else {
      register(name).onBlur(event);
    }
  };
  return (
    <Form.Group className="mb-3">
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type={type}
        {...register(name)}
        onBlur={onBlurHandler}
        // isInvalid={errors.firstname?.message ? true : false} -->
        isInvalid={!!error}
        disabled={disabled}
        isValid={!!success}
      />
      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
      <Form.Control.Feedback type="valid">{success}</Form.Control.Feedback>
      {formText && <Form.Text muted>{formText}</Form.Text>}
    </Form.Group>
  );
};
export default Input;
