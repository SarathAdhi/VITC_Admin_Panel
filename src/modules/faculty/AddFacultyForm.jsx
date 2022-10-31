import React from "react";
import Form from "@components/Form";
import Input from "@elements/Input";
import { StackDivider } from "@chakra-ui/react";
import { H4, H5, P } from "@elements/Text";
import { EducationalDetails } from "./components/Form/EducationalDetails";
import { ProjectDetails } from "./components/Form/ProjectDetails";
import { PatentDetails } from "./components/Form/PatentDetails";
import { AwardsAndCollaborations } from "./components/Form/AwardsAndCollaborations";

export const Divider = () => <StackDivider p={2} />;

export const AddFacultyForm = ({ initialValues, handleSubmit, isUpdate }) => {
  return (
    <div className="grid gap-2 border">
      <div className="bg-[#1e4b8e] py-2 px-4">
        <H4 className="text-white">Faculty Profile</H4>
      </div>

      <Form
        className="px-3"
        actionClassName="flex justify-end"
        onSubmit={(values, reset) => {
          handleSubmit({ values });

          if (!isUpdate) {
            reset();
          }
        }}
        initialValues={initialValues}
        submitButton={{
          title: isUpdate ? "Update Faculty" : "Save Profile",
          className: "bg-[#408557] text-white px-4 py-2",
        }}
      >
        <P className="!font-semibold">
          Note: <span className="text-red-500">*</span> are Mandatory |{" "}
          <span className="text-red-500">
            Do not enter NIT,-,NA ffor no data available fields, leave them
            blank.
          </span>
        </P>

        <div className="bg-[#6e747d] p-2">
          <H5 className="!font-semibold text-white">Employee Details</H5>
        </div>

        <Form.Grid3>
          <Input label="Employee Id" name="id" required disabled={isUpdate} />
          <Input
            label="Salutation"
            name="salutation"
            required
            disabled={isUpdate}
          />

          <Input label="Name" name="name" required />
          <Input label="Designation" name="designation" required />

          <Input label="School / Center" name="school" required />
          <Input label="Department" name="department" required />

          <Input label="Email" name="email" disabled={isUpdate} />
        </Form.Grid3>

        <Divider />

        <EducationalDetails initialValues={initialValues} isUpdate={isUpdate} />

        <Divider />

        <div className="bg-[#6e747d] p-2">
          <H5 className="!font-semibold text-white">
            Post Doctoral Experience Details
          </H5>
        </div>

        <Input
          className="w-full"
          label="Post Doctoral Experience (if any)"
          name="postDoctoralExperience"
        />

        <Divider />

        <div className="bg-[#6e747d] p-2">
          <H5 className="!font-semibold text-white">Research Details</H5>
        </div>

        <Form.Grid3>
          <div>
            <Input
              className="w-full"
              label="Specialization"
              name="researchDetails.specialization"
            />
            {"[Specify a max. of 5 areas with comma]"}
          </div>

          <Input
            className="w-full"
            label="ORCID ID"
            name="researchDetails.orcid"
            required
          />

          <Input
            className="w-full"
            label="Scopus ID"
            name="researchDetails.scopus"
            required
          />

          <Input
            type="number"
            className="w-full"
            label="h Index"
            name="researchDetails.hIndex"
          />

          <Input
            className="w-full"
            label="Google Scholar ID"
            name="researchDetails.googleScholar"
            required
          />

          <Input
            type="number"
            className="w-full"
            label="i10 Index"
            name="researchDetails.i10Index"
          />
        </Form.Grid3>

        <Divider />

        <ProjectDetails initialValues={initialValues} isUpdate={isUpdate} />

        <Divider />

        <PatentDetails initialValues={initialValues} isUpdate={isUpdate} />

        <Divider />

        <AwardsAndCollaborations
          initialValues={initialValues}
          isUpdate={isUpdate}
        />

        <Divider />

        <div className="bg-[#6e747d] p-2">
          <H5 className="!font-semibold text-white">Other Details</H5>
        </div>

        <Form.Grid2>
          <Input
            className="w-full"
            label="Editorial Experience (if any)"
            name="editorialExperience"
          />

          <Input
            className="w-full"
            label="Personal Website (if any)"
            name="personalWebsite"
          />
        </Form.Grid2>

        <Divider />

        <div className="bg-[#6e747d] p-2">
          <H5 className="!font-semibold text-white">Photo Link</H5>
        </div>

        <Form.Grid2>
          <Input label="Photo Link" name="image" />
        </Form.Grid2>

        <Divider />
      </Form>
    </div>
  );
};