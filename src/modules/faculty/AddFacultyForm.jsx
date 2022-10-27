import React, { useState } from "react";
import Form from "@elements/Form";
import {
  PlusCircleIcon,
  RefreshIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import Input from "@components/Input";
import { FieldArray } from "formik";
import { Button, StackDivider } from "@chakra-ui/react";
import { H5 } from "@components/Text";
import clsx from "clsx";
import axios from "@lib/axios";
import { showSuccessToast } from "@utils/toast";

const Divider = () => <StackDivider p={2} />;

async function deleteEducationalDetails(id) {
  console.log(id);
  if (id) {
    const { message } = await axios.delete(
      `/faculty/educational-details/${id}`
    );

    showSuccessToast(message);
  }
}

async function deletePatentPublishedDetails(id) {
  if (id) {
    const { message } = await axios.delete(
      `/faculty/patent-published-details/${id}`
    );

    showSuccessToast(message);
  }
}

export const AddFacultyForm = ({ initialValues, handleSubmit, isUpdate }) => {
  const [educationalDetailsCount, setEducationalDetailsCount] = useState(
    initialValues.educationalDetails.length
  );

  const [patentPublishedDetailsCount, setPatentPublishedDetailsCount] =
    useState(initialValues.patentPublishedDetails.length);

  return (
    <Form
      onSubmit={(values, reset) => {
        handleSubmit({ values });

        if (!isUpdate) {
          reset();
          setEducationalDetailsCount(1);
          setPatentPublishedDetailsCount(1);
        }
      }}
      initialValues={initialValues}
      submitButton={{
        title: isUpdate ? "Update Faculty" : "Add Faculty",
        Icon: isUpdate ? RefreshIcon : PlusCircleIcon,
      }}
      resetButton={{ title: "Clear", Icon: TrashIcon }}
    >
      <Form.Grid>
        <Input
          label="Faculty ID"
          name="id"
          placeholder="Enter the Faculty ID"
          disabled={isUpdate}
        />
        <Input
          label="Faculty Name"
          name="name"
          placeholder="Enter Faculty name"
        />

        <Input
          label="Faculty Email"
          name="email"
          placeholder="Enter faculty email"
          disabled={isUpdate}
        />
        <Input label="Faculty Image" name="image" placeholder="Faculty image" />

        <Input
          label="Faculty Designation"
          name="designation"
          placeholder="Enter faculty designation"
        />
        <Input
          label="Faculty Department"
          name="department"
          placeholder="Enter Faculty department"
        />

        <Input
          label="Faculty school"
          name="school"
          placeholder="Enter Faculty school"
        />
      </Form.Grid>

      <Divider />

      <FieldArray name="educationalDetails">
        {(arrayHelpers) => (
          <div className="grid gap-5 justify-items-start">
            <Form.Grid
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
                    <H5 className="underline">
                      Faculty Educational Details {index + 1}
                    </H5>

                    {(index !== 0 || isUpdate) && (
                      <button
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

                  <Input
                    className="w-full"
                    label="University"
                    name={`educationalDetails[${index}].university`}
                    placeholder="Ex: VIT"
                  />

                  <Input
                    className="w-full"
                    label="Degree"
                    name={`educationalDetails[${index}].degree`}
                    placeholder="Ex: PhD, MD"
                  />

                  <Input
                    type="number"
                    className="w-full"
                    label="Graduated year"
                    name={`educationalDetails[${index}].graduatedIn`}
                    placeholder="Ex: 2019"
                  />
                </div>
              ))}
            </Form.Grid>

            <Button
              leftIcon={<PlusCircleIcon className="w-6 h-6" />}
              onClick={() => setEducationalDetailsCount((pre) => pre + 1)}
            >
              Add Educational Details
            </Button>
          </div>
        )}
      </FieldArray>

      <Divider />

      <H5 className="underline">Faculty Research Details</H5>
      <Form.Grid>
        <Input
          className="w-full"
          label="Specialization"
          name="researchDetails.specialization"
          placeholder="Ex: ML, AI. Note: Add comma separated values"
        />

        <Input
          className="w-full"
          label="ORCID"
          name="researchDetails.orcid"
          placeholder="https://orcid.org/<id>"
        />

        <Input
          className="w-full"
          label="Scopus"
          name="researchDetails.scopus"
          placeholder=" https://www.scopus.com/..."
        />

        <Input
          className="w-full"
          label="Google Scholar"
          name="researchDetails.googleScholar"
          placeholder="https://scholar.google.com/..."
        />

        <Input
          type="number"
          className="w-full"
          label="h-Index"
          name="researchDetails.hIndex"
          placeholder="h-Index"
        />

        <Input
          type="number"
          className="w-full"
          label="i10-Index"
          name="researchDetails.i10Index"
          placeholder="i10-Index"
        />
      </Form.Grid>

      <Divider />

      <FieldArray name="patentPublishedDetails">
        {(arrayHelpers) => (
          <div className="grid gap-5 justify-items-start">
            <Form.Grid
              className={clsx(
                "w-full",
                patentPublishedDetailsCount === 1 && "!grid-cols-1"
              )}
            >
              {[...Array(patentPublishedDetailsCount)].map((_, index) => (
                <div
                  key={"patentPublishedDetails" + index}
                  className="w-full grid gap-2"
                >
                  <div className="flex items-center justify-between gap-2">
                    <H5 className="underline">
                      Patent Published Details {index + 1}
                    </H5>

                    <button
                      className="underline"
                      onClick={() => {
                        if (isUpdate) {
                          deletePatentPublishedDetails(
                            initialValues.patentPublishedDetails[index]?.id
                          );
                        }

                        setPatentPublishedDetailsCount((pre) => pre - 1);
                        arrayHelpers.remove(index);
                      }}
                    >
                      Remove
                    </button>
                  </div>

                  <Input
                    className="w-full"
                    label="Title"
                    name={`patentPublishedDetails[${index}].title`}
                    placeholder="Enter the Title"
                  />

                  <Input
                    className="w-full"
                    label="Application number"
                    name={`patentPublishedDetails[${index}].applicationNumber`}
                    placeholder="Enter the Application Number"
                  />
                </div>
              ))}
            </Form.Grid>

            <Button
              leftIcon={<PlusCircleIcon className="w-6 h-6" />}
              onClick={() => setPatentPublishedDetailsCount((pre) => pre + 1)}
            >
              Add Patent Published
            </Button>
          </div>
        )}
      </FieldArray>
    </Form>
  );
};
