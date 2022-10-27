import { LinkedItem } from "@components/LinkedItem";
import { PageLayout } from "@layouts/PageLayout";
import React from "react";

const Home = () => {
  return (
    <PageLayout className="flex gap-5">
      <LinkedItem className="border-2 p-2 rounded-sm" href="/faculty/add">
        Add Faculty
      </LinkedItem>

      <LinkedItem className="border-2 p-2 rounded-sm" href="/faculty">
        View all Faculties
      </LinkedItem>
    </PageLayout>
  );
};

export default Home;
