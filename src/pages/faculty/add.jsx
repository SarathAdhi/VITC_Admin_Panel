import { PageLayout } from "@layouts/PageLayout";
import React from "react";
import { AddFacultyForm } from "@modules/faculty/AddFacultyForm";
import { showSuccessToast } from "@utils/toast";
import axios from "@lib/axios";

const _initialValues = {
  id: "",
  name: "",
  email: "",
  image: "",
  designation: "",
  department: "",
  school: "",
  educationalDetails: [
    {
      degree: "",
      university: "",
      graduatedIn: "",
    },
  ],
  researchDetails: {
    specialization: [],
    orcid: "",
    scopus: "",
    googleScholar: "",
    hIndex: 0,
    i10Index: 0,
  },
  patentPublishedDetails: [
    {
      title: "",
      applicationNumber: "",
    },
  ],
};

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

  if (isUpdate) {
    const { message } = await axios.put(`/faculty/${values.uuid}`, {
      ...newValues,
    });

    showSuccessToast(message);

    return;
  }

  const { message } = await axios.post("/faculty", {
    ...newValues,
  });

  showSuccessToast(message);
};

const InternalStaffForm = ({ initialValues, isUpdate = false }) => (
  <AddFacultyForm
    initialValues={initialValues}
    isUpdate={isUpdate}
    handleSubmit={(props) => handleSubmit({ ...props, isUpdate })}
  />
);

const AddStaff = ({ initialValues = _initialValues }) => {
  return (
    <PageLayout>
      <InternalStaffForm initialValues={initialValues} />
    </PageLayout>
  );
};

export { InternalStaffForm };

export default AddStaff;
