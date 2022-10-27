import clsx from "clsx";
import React from "react";
import { Formik } from "formik";
import { Button } from "@chakra-ui/react";

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
          className={clsx("grid gap-y-3 w-full", className)}
          onSubmit={handleSubmit}
          {...props}
        >
          {children}

          {(submitButton || resetButton) && (
            <div className={clsx("flex mt-3 gap-x-4", actionClassName)}>
              {submitButton && (
                <Button
                  type="submit"
                  bgColor={"#059862"}
                  color={"white"}
                  _hover={{ bgColor: "#4caf50" }}
                  fontWeight={"semibold"}
                  isLoading={isSubmitting}
                  leftIcon={
                    submitButton.Icon && (
                      <submitButton.Icon className="w-5 h-5" />
                    )
                  }
                  // disabled={!(isValid && dirty)}
                >
                  {submitButton.title}
                </Button>
              )}

              {resetButton && (
                <Button
                  type="reset"
                  bgColor={"red"}
                  _hover={{ bgColor: "red" }}
                  color={"white"}
                  fontWeight={"semibold"}
                  onClick={handleReset}
                  disabled={isSubmitting}
                  leftIcon={
                    resetButton.Icon && <resetButton.Icon className="w-5 h-5" />
                  }
                >
                  {resetButton.title}
                </Button>
              )}
            </div>
          )}
        </form>
      )}
    </Formik>
  );
};

Form.Row = ({ className, children }) => (
  <div
    className={clsx(
      "grid gap-3 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4",
      className
    )}
  >
    {children}
  </div>
);

Form.Grid = ({ className, children }) => (
  <div className={clsx("grid gap-3 sm:grid-cols-2", className)}>{children}</div>
);

Form.Row.displayName = "Form.Row";
Form.Grid.displayName = "Form.Grid";

export default Form;
