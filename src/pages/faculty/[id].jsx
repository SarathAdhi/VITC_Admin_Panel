import {
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { LinkedItem } from "@components/LinkedItem";
import { H1, H2, H3, H4, H5, H6, P } from "@components/Text";
import { CheckIcon } from "@heroicons/react/outline";
import { PageWrapper } from "@layouts/PageWrapper";
import axios from "@lib/axios";
import { staffs } from "@utils/constants";
import clsx from "clsx";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const sidebarNavLinks = [
  { key: "about", href: "About" },
  { key: "educational-details", href: "Educational Details" },
  { key: "research-details", href: "Research Details" },
  { key: "patents-published", href: "Patents Published" },
  { key: "international-collaborations", href: "International Collaborations" },
];

const LeftSideBar = ({ className, image, router }) => {
  const [currentTabKey, setCurrentTabKey] = useState(sidebarNavLinks[0].key);

  return (
    <div
      className={clsx(
        className,
        "sticky top-0 md:h-screen bg-[#004c93] grid gap-5 justify-items-center place-content-center"
      )}
    >
      <div className="relative hidden md:flex w-28 h-40 rounded-[50%] border-[#4b6fa5] border-4">
        <Image src={image} layout="fill" className="rounded-[50%]" />
      </div>

      <div className="flex flex-col items-center">
        {sidebarNavLinks.map(({ key, href }) => (
          <LinkedItem
            key={key}
            href={`#${key}`}
            className={clsx(
              currentTabKey === key && "!text-white",
              "text-center font-bold text-lg text-[#ffffff8c] duration-200 hover:text-[#ffffffbf]"
            )}
            onClick={() => setCurrentTabKey(key)}
          >
            {href}
          </LinkedItem>
        ))}
      </div>
    </div>
  );
};

const ViewStaff = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [facultyDetails, setFacultyDetails] = useState(null);

  const router = useRouter();
  const { id } = router.query;

  const fetchFacultyDetails = async () => {
    const faculty = await axios.get(`/faculty/${id}`);

    setFacultyDetails(faculty);
    setIsLoading(false);
  };

  useEffect(() => {
    if (id) {
      fetchFacultyDetails();
    }
  }, [id]);

  if (isLoading) return <div className="text-center">Loading...</div>;
  if (!facultyDetails) return <p className="text-center">Staff not found</p>;

  const {
    name,
    school,
    department,
    designation,
    educationalDetails,
    researchDetails,
    patentPublishedDetails,
  } = facultyDetails;

  const { googleScholar, hIndex, i10Index, orcid, scopus, specialization } =
    researchDetails;

  console.log(facultyDetails);

  return (
    <PageWrapper title="" className="w-full grid md:grid-cols-16">
      <LeftSideBar
        className="w-full md:col-span-6 lg:col-span-5 xl:col-span-4 2xl:col-span-2"
        {...facultyDetails}
        router={router}
      />

      <div className="w-full flex flex-col md:col-span-10 lg:col-span-11 xl:col-span-12 2xl:col-span-14">
        <section
          id="about"
          className="h-screen p-2 md:p-10 flex flex-col justify-center"
        >
          <Heading size={"2xl"} color={"#004c93"}>
            {name}
          </Heading>

          <p className="text-lg text-[#6c757d]">
            <span className="font-bold">Designation : </span>
            <span className="font-medium">{designation}</span>
          </p>

          <p className="text-lg text-[#6c757d]">
            <span className="font-bold">School / Centre : </span>
            <span className="font-medium">{school}</span>
          </p>

          <p className="text-lg text-[#6c757d]">
            <span className="font-bold">Department : </span>
            <span className="font-medium">{department}</span>
          </p>
        </section>

        <section
          id="educational-details"
          className="w-full h-screen p-2 md:p-10 flex flex-col justify-center gap-5"
        >
          <Heading>Educational Details</Heading>

          <div className="grid gap-4">
            {educationalDetails.map(
              ({ id, graduatedIn, university, degree }) => (
                <div
                  key={id}
                  className="w-full flex items-start justify-between"
                >
                  <div>
                    <H4 className="text-[#343a40] !font-bold">{university}</H4>
                    <H6 className="text-[#6C757D]">{degree}</H6>
                  </div>

                  <P className="text-[#004c93] !font-medium">
                    Graduated in {graduatedIn}
                  </P>
                </div>
              )
            )}
          </div>
        </section>

        <section
          id="research-details"
          className="h-screen p-2 md:p-10 flex flex-col justify-center gap-5"
        >
          <Heading>Research Details</Heading>

          <div className="w-full flex items-start justify-between ">
            <div className="grid gap-5">
              <div>
                <H3 className="text-[#6C757D] !text-lg">
                  Areas of Specialization
                </H3>

                <P className="grid ">
                  {specialization.map((spe) => (
                    <span key={spe} className="flex items-center gap-1">
                      <CheckIcon className="w-5 h-5" />
                      {spe}
                    </span>
                  ))}
                </P>
              </div>

              <div className="grid gap-4">
                <div className="flex items-center gap-5">
                  <Image
                    src={"/assets/faculty/orcid.png"}
                    className="object-contain"
                    width={"112px"}
                    height={"40px"}
                  />

                  <a href={orcid}>{orcid}</a>
                </div>

                <div className="flex items-center gap-5">
                  <Image
                    src={"/assets/faculty/scopus.png"}
                    className="object-contain"
                    width={"112px"}
                    height={"40px"}
                  />

                  <a href={scopus}>{scopus}</a>
                </div>

                <div className="flex items-center gap-5">
                  <Image
                    src={"/assets/faculty/google-scholar.png"}
                    className="object-contain"
                    width={"112px"}
                    height={"40px"}
                  />

                  <a href={googleScholar}>{googleScholar}</a>
                </div>

                <div className="flex items-center gap-5">
                  <Image
                    src={"/assets/faculty/hindex.png"}
                    className="object-contain"
                    width={"112px"}
                    height={"40px"}
                  />
                  <P>: {hIndex}</P>
                </div>

                <div className="flex items-center gap-5">
                  <Image
                    src={"/assets/faculty/i10index.png"}
                    className="object-contain"
                    width={"112px"}
                    height={"40px"}
                  />
                  <P>: {i10Index}</P>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="patents-published"
          className="w-full h-screen p-2 md:p-10 flex flex-col justify-center"
        >
          <Heading>Patent Published Details</Heading>

          <div className="!grid">
            <TableContainer>
              <Table variant={"striped"}>
                <Thead>
                  <Tr className="bg-[#004c93]">
                    <Th color={"white"}>Title</Th>
                    <Th color={"white"}>Application No.</Th>
                  </Tr>
                </Thead>

                <Tbody>
                  {patentPublishedDetails.map(
                    ({ id, title, applicationNumber }) => (
                      <Tr key={id + title}>
                        <Td>{title}</Td>
                        <Td>{applicationNumber}</Td>
                      </Tr>
                    )
                  )}
                </Tbody>
              </Table>
            </TableContainer>
          </div>
        </section>

        <section
          id="international-collaborations"
          className="h-screen p-2 md:p-10 flex flex-col justify-center"
        >
          <Heading>International Collaborations</Heading>
        </section>
      </div>
    </PageWrapper>
  );
};

export default ViewStaff;
