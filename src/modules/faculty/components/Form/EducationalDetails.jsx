import Form from "@components/Form";
import Input from "@elements/Input";
import { H5 } from "@elements/Text";
import { PlusCircleIcon } from "@heroicons/react/solid";
import axios from "@lib/axios";
import { showSuccessToast } from "@utils/toast";
import clsx from "clsx";
import { FieldArray } from "formik";
import React, { useState } from "react";

async function deleteEducationalDetails(id) {
  console.log(id);
  if (id) {
    const { message } = await axios.delete(
      `/faculty/educational-details/${id}`
    );

    showSuccessToast(message);
  }
}

export const EducationalDetails = ({ initialValues, isUpdate }) => {
  const [educationalDetailsCount, setEducationalDetailsCount] = useState(
    initialValues.educationalDetails.length || 1
  );

  return (
    <>
      <div className="bg-[#6e747d] p-2 flex items-center justify-between">
        <H5 className="!font-semibold text-white">Educational Details</H5>

        <button
          type="button"
          onClick={() => setEducationalDetailsCount((pre) => pre + 1)}
          className="flex items-center gap-1 p-1 font-semibold bg-yellow-500"
        >
          <PlusCircleIcon className="w-6 h-6" />
          Add More
        </button>
      </div>

      <FieldArray name="educationalDetails">
        {(arrayHelpers) => (
          <div className="grid gap-5 justify-items-start">
            <Form.Row
              className={clsx(
                "w-full",
                educationalDetailsCount === 1 && "!grid-cols-1"
              )}
            >
              {[...Array(educationalDetailsCount)].map((_, index) => (
                <div
                  key={"educationalDetails" + index}
                  className="w-full grid gap-2"
                >
                  <div className="flex items-center justify-between gap-2">
                    {(index !== 0 || isUpdate) && (
                      <button
                        type="button"
                        className="underline"
                        onClick={() => {
                          if (isUpdate) {
                            deleteEducationalDetails(
                              initialValues.educationalDetails[index]?.id
                            );
                          }

                          setEducationalDetailsCount((pre) => pre - 1);
                          arrayHelpers.remove(index);
                        }}
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  <Form.Grid4>
                    <Input
                      className="w-full"
                      label="Degree"
                      name={`educationalDetails[${index}].degree`}
                      required
                    />

                    <Input
                      className="w-full"
                      placeholder="Y Y Y Y"
                      maxLength={4}
                      label="Passed Out Year"
                      name={`educationalDetails[${index}].graduatedYear`}
                      required
                    />

                    <Input
                      className="w-full"
                      label="Specialization"
                      name={`educationalDetails[${index}].specialization`}
                      required
                    />

                    <Input
                      className="w-full"
                      label="Institute / University / College"
                      name={`educationalDetails[${index}].university`}
                      required
                    />
                  </Form.Grid4>
                </div>
              ))}
            </Form.Row>
          </div>
        )}
      </FieldArray>
    </>
  );
};
