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
      setIsLoading(false);
    } catch ({ error }) {
      if (error) {
        // router.replace("/");
      }
    }
  }

  useEffect(() => {
    if (id) getFaculty();
  }, [id]);

  console.log(facultyDetails);

  if (isLoading) return <div>Loading...</div>;

  return (
    <PageLayout>
      <InternalStaffForm initialValues={facultyDetails} isUpdate />
    </PageLayout>
  );
};

export default UpdateFaculty;
