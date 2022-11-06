import { DEPARTMENT } from "./constants";

export const initialFacultyValues = {
  id: "",
  salutation: "",
  name: "",
  email: "",
  image: "",
  designation: "",
  role: "",
  department: DEPARTMENT[0],
  school: "",
  educationalDetails: [
    {
      degree: "",
      university: "",
      specialization: "",
      graduatedYear: "",
    },
  ],
  postDoctoralExperience: "",
  researchDetails: {
    specialization: [],
    orcid: "",
    scopus: "",
    googleScholar: "",
    hIndex: 0,
    i10Index: 0,
  },
  ongoingConsultancyProjectDetails: [
    // {
    //   title: "",
    //   fundingAgency: "",
    // },
  ],
  completedConsultancyProjectDetails: [
    // {
    //   title: "",
    //   fundingAgency: "",
    // },
  ],
  ongoingFundedProjectDetails: [
    // {
    //   title: "",
    //   fundingAgency: "",
    // },
  ],
  completedFundedProjectDetails: [
    // {
    //   title: "",
    //   fundingAgency: "",
    // },
  ],
  patentPublishedDetails: [
    // {
    //   title: "",
    //   applicationNumber: "",
    // },
  ],
  patentGrantedDetails: [
    // {
    //   title: "",
    //   applicationNumber: "",
    // },
  ],
  bookPublishedDetails: [
    // {
    //   title: "",
    //   publisher: "",
    //   year: "",
    // },
  ],
  awardDetails: [],
  majorInternationalCollaborationsDetails: [],
  majorIndustryCollaborationsDetails: [],
  editorialExperience: "",
  personalWebsite: "",
};
