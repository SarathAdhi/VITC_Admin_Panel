import Form from "@components/Form";
import Input from "@elements/Input";
import { H6 } from "@elements/Text";
import withAuth from "@hoc/withAuth";
import { PageLayout } from "@layouts/PageLayout";
import { useRouter } from "next/router";
import React, { useState } from "react";
import * as y from "yup";

const schema = y.object().shape({
  id: y.string().required("Enter the Employee Id"),
});

const initialValue = {
  id: "",
};

// const FacultyDetails = ({ faculty }) => {
//   const {
//     id,
//     salutation,
//     name,
//     email,
//     image,
//     designation,
//     department,
//     school,
//     educationalDetails,
//     postDoctoralExperience,
//     researchDetails,
//     consultancyProjectDetails,
//     completedConsultancyProjectDetails,
//     ongoingFundedProjectDetails,
//     completedFundedProjectDetails,
//     patentPublishedDetails,
//     patentGrantedDetails,
//     bookPublishedDetails,
//     awardDetails,
//     majorInternationalCollaborationsDetails,
//     majorIndustryCollaborationsDetails,
//     editorialExperience,
//     personalWebsite,
//   } = faculty;
//   return (
//     <div>
//       <p>{id}</p>
//       <p>{salutation}</p>
//       <p>{name}</p>
//       <p>{email}</p>
//     </div>
//   );
// };

const ViewFaculty = () => {
  const router = useRouter();

  const [faculty, setFaculty] = useState(null);

  return (
    <PageLayout
      title="View Faculty"
      className="grid justify-items-center gap-5"
    >
      <div className="mt-10 w-full max-w-[500px] rounded-sm overflow-hidden">
        <div className="bg-[#1e4b8e] py-2 px-4">
          <H6 className="text-white">Enter to Edit / View Faculty</H6>
        </div>

        <Form
          schema={schema}
          initialValues={initialValue}
          className="py-4 px-4 border"
          submitButton={{
            title: "View Faculty",
            className: "bg-[#0d6efd] text-sm text-white px-2 py-1",
          }}
          onSubmit={async (values) => {
            router.push(`/faculty/update/${values.id}`);
            // const res = await axios.get(`/faculty/${values.id}`);
            // setFaculty(res);
          }}
        >
          <Input label="Employee Id" name="id" />
        </Form>
      </div>

      {/* {faculty && <FacultyDetails faculty={faculty} />} */}
    </PageLayout>
  );
};

export default ViewFaculty;
