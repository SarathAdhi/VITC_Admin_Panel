import { PageLayout } from "@layouts/PageLayout";
import React from "react";
import { AddFacultyForm } from "@modules/faculty/AddFacultyForm";
import { showSuccessToast } from "@utils/toast";
import axios from "@lib/axios";
import withAuth from "@hoc/withAuth";
import { initialFacultyValues } from "@utils/initialValues";

const handleSubmit = async ({ values, isUpdate }) => {
  const newValues = {
    ...values,
    educationalDetails:
      values.educationalDetails.length !== 0 ? values.educationalDetails : [],

    patentPublishedDetails:
      values.patentPublishedDetails.length !== 0
        ? values.patentPublishedDetails
        : [],

    researchDetails: {
      ...values.researchDetails,
      specialization:
        values.researchDetails.specialization.length > 0
          ? values.researchDetails.specialization
              .split(",")
              .map((item) => item.trim())
          : [],
    },
  };

  console.log(newValues);

  if (isUpdate) {
    const { message } = await axios.put(`/faculty/${values.id}`, {
      ...newValues,
    });

    showSuccessToast(message);

    return;
  }

  await axios.post("/faculty/create", {
    ...newValues,
  });
};

const InternalStaffForm = ({ initialValues, isUpdate = false }) => (
  <AddFacultyForm
    initialValues={initialValues}
    isUpdate={isUpdate}
    handleSubmit={(props) => handleSubmit({ ...props, isUpdate })}
  />
);

const AddStaff = ({ initialValues = initialFacultyValues }) => {
  return (
    <PageLayout title="Add Faculty">
      <InternalStaffForm initialValues={initialValues} />
    </PageLayout>
  );
};

export { InternalStaffForm };

export default withAuth(AddStaff);
