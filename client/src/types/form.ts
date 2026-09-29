import type {
  FieldValues,
  Path,
  RegisterOptions,
  UseFormReturn,
} from "react-hook-form";

export interface CommonInputProps<T extends FieldValues> {
  label?: string;
  name: Path<T>;
  hForm: UseFormReturn<T>;
  registerOptions?: RegisterOptions<T, Path<T>>;
  icon?: React.ReactNode;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  disabled?: boolean;
  wrapperClassName?: string;
  inputClassName?: string;
  labelClassName?: string;
  showError?: boolean;
  readOnly?: boolean;
  options?: { value: string; label: string }[];
}

export type UploadMediaResponseType = { imageUrl: string };
