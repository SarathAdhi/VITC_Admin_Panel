import { Button } from "@chakra-ui/react";
import { LinkedItem } from "@elements/LinkedItem";
import { H4, P } from "@elements/Text";
import withAuth from "@hoc/withAuth";
import { PageCard } from "@layouts/PageCard";
import { PageLayout } from "@layouts/PageLayout";
import axios from "@lib/axios";
import { showSuccessToast } from "@utils/toast";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { appStore } from "@utils/store";

const Approval = () => {
  const { getNotifications } = appStore();
  const [unApprovedFaculties, setUnApprovedFaculties] = useState([]);
  const [approvedFaculties, setApprovedFaculties] = useState([]);

  const getApprovals = async () => {
    try {
      const _unApprovedFaculties = await axios.get(
        "/faculty/approvals?isApproved=false"
      );
      setUnApprovedFaculties(_unApprovedFaculties);

      const _approvedFaculties = await axios.get(
        "/faculty/approvals?isApproved=true"
      );
      setApprovedFaculties(_approvedFaculties);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getApprovals();
  }, []);

  const approveFaculty = async (id) => {
    const { message } = await axios.put(`/faculty/approve/${id}`);

    showSuccessToast(message);
    getNotifications();
    getApprovals();
  };

  const unApproveFaculty = async (id) => {
    const { message } = await axios.put(`/faculty/un-approve/${id}`);

    showSuccessToast(message);
    getNotifications();
    getApprovals();
  };

  return (
    <PageLayout title="Admin Dashborad">
      <PageCard title="Approval" className="grid gap-4">
        <Tabs variant="solid-rounded" colorScheme="blue">
          <TabList gap={5}>
            <Tab>Pending Approvals</Tab>
            <Tab>Approved Faculties</Tab>
          </TabList>

          <TabPanels>
            <TabPanel className="grid gap-4">
              {unApprovedFaculties.map((faculty) => (
                <div
                  key={faculty.uuid}
                  className="flex items-center justify-between bg-gray-300 px-3 py-2 rounded-md"
                >
                  <LinkedItem
                    className="flex items-center gap-3"
                    href={`/approvals/${faculty.id}`}
                  >
                    <Image
                      width={40}
                      height={40}
                      src={faculty.image || "/assets/blank-profile.webp"}
                      className="rounded-full"
                    />

                    <div>
                      <H4>{faculty.name}</H4>
                      <P>ID: {faculty.id}</P>
                    </div>
                  </LinkedItem>

                  <div className="flex gap-5">
                    <Button
                      bgColor={"green"}
                      _hover={{ bgColor: "green.600" }}
                      _active={{ bgColor: "green.500" }}
                      color={"white"}
                      onClick={() => approveFaculty(faculty.id)}
                    >
                      Approve
                    </Button>
                  </div>
                </div>
              ))}
            </TabPanel>

            <TabPanel className="grid gap-4">
              {approvedFaculties.map((faculty) => (
                <div
                  key={faculty.uuid}
                  className="flex items-center justify-between bg-gray-300 px-3 py-2 rounded-md"
                >
                  <LinkedItem
                    className="flex items-center gap-3"
                    href={`/approvals/${faculty.id}`}
                  >
                    <Image
                      width={40}
                      height={40}
                      src={faculty.image || "/assets/blank-profile.webp"}
                      className="rounded-full"
                    />

                    <div>
                      <H4>{faculty.name}</H4>
                      <P>ID: {faculty.id}</P>
                    </div>
                  </LinkedItem>

                  <div className="flex gap-5">
                    <Button
                      bgColor={"red"}
                      _hover={{ bgColor: "red.600" }}
                      _active={{ bgColor: "red.500" }}
                      color={"white"}
                      onClick={() => unApproveFaculty(faculty.id)}
                    >
                      Un-Approve
                    </Button>
                  </div>
                </div>
              ))}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </PageCard>
    </PageLayout>
  );
};

export default withAuth(Approval);
