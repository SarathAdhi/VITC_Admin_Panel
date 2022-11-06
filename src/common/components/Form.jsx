import clsx from "clsx";
import React from "react";
import { Formik } from "formik";

const Form = ({
  className,
  actionClassName,
  initialValues = {},
  schema,
  onSubmit,
  children,
  submitButton,
  resetButton,
  ...props
}) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={async (values, helpers) => {
        const reset = () => {
          helpers.resetForm({});
        };

        const errors = (await onSubmit?.(values, reset, helpers)) || {};

        if (Object.keys(errors).length > 0) {
          helpers.setErrors(errors);
        }
      }}
    >
      {({ handleSubmit, isSubmitting, handleReset, isValid, dirty }) => (
        <form
          onSubmit={handleSubmit}
          className={clsx("grid gap-y-3 w-full", className)}
          {...props}
        >
          {children}

          {(submitButton || resetButton) && (
            <div className={clsx("", actionClassName)}>
              {submitButton && (
                <button
                  type="submit"
                  className={clsx(
                    "w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none",
                    submitButton.className
                  )}
                >
                  {submitButton.title}
                </button>
              )}

              {resetButton && (
                <button type="reset" className={resetButton.className}>
                  {resetButton.title}
                </button>
              )}
            </div>
          )}
        </form>
      )}
    </Formik>
  );
};

Form.Row = ({ className, children }) => (
  <div className={clsx("grid gap-3", className)}>{children}</div>
);

Form.Grid2 = ({ className, children }) => (
  <div className={clsx("grid gap-3 sm:grid-cols-2 lg:grid-cols-2", className)}>
    {children}
  </div>
);

Form.Grid3 = ({ className, children }) => (
  <div className={clsx("grid gap-3 sm:grid-cols-2 lg:grid-cols-3", className)}>
    {children}
  </div>
);

Form.Grid4 = ({ className, children }) => (
  <div
    className={clsx(
      "grid gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
      className
    )}
  >
    {children}
  </div>
);

Form.Row.displayName = "Form.Row";
Form.Grid2.displayName = "Form.Grid2";
Form.Grid3.displayName = "Form.Grid3";
Form.Grid4.displayName = "Form.Grid4";

export default Form;
