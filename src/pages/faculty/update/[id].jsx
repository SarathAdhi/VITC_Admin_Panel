import { H2 } from "@elements/Text";
import withAuth from "@hoc/withAuth";
import { PageLayout } from "@layouts/PageLayout";
import axios from "@lib/axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { InternalStaffForm } from "../add";

const UpdateFaculty = () => {
  const router = useRouter();
  const [facultyDetails, setFacultyDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { id } = router.query;

  async function getFaculty() {
    try {
      const faculty = await axios.get(`/faculty/${id}`);
      console.log(faculty);

      setFacultyDetails({
        ...faculty,
        researchDetails: {
          ...faculty.researchDetails,
          specialization: faculty.researchDetails.specialization.join(","),
        },
      });
    } catch ({ error }) {
      console.log({ error });
      if (error) {
        // router.replace("/");
      }
    }

    setIsLoading(false);
  }

  useEffect(() => {
    if (id) getFaculty();
  }, [id]);

  console.log(facultyDetails);

  if (isLoading) return <div>Loading...</div>;

  return (
    <PageLayout title={id}>
      {!facultyDetails ? (
        <H2 className="text-center">Faculty not found with ID: {id}</H2>
      ) : (
        <InternalStaffForm initialValues={facultyDetails} isUpdate />
      )}
    </PageLayout>
  );
};

export default withAuth(UpdateFaculty);
