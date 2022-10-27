import clsx from "clsx";
import React from "react";
import { useField, useFormikContext } from "formik";

const Input = ({
  name,
  id = name,
  label,
  className,
  inputClassName,
  ...inputProps
}) => {
  const [input] = useField(name);
  const { isSubmitting } = useFormikContext();

  return (
    <div className={className}>
      {!!label && (
        <label
          htmlFor={id}
          className="block mb-1 text-left text-sm font-medium text-gray-700"
        >
          {label} {inputProps.required && "*"}
        </label>
      )}

      <input
        id={id}
        {...input}
        disabled={isSubmitting}
        {...inputProps}
        className={clsx(
          "block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none sm:text-sm",
          !inputProps.disabled &&
            !inputProps.readOnly &&
            "focus:ring-primary-500 focus:border-primary-500",
          inputClassName
        )}
      />
    </div>
  );
};

export default Input;
