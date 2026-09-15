import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";

function AppLayout() {

  const [applications, setApplications] = useState(() => {

    const savedApplications =
      localStorage.getItem("careerflowApplications");

    if (savedApplications) {

      const savedData = JSON.parse(savedApplications);

      return savedData.map((application) => ({
        ...application,
        priority: application.priority || "Normal",
      }));

    }


    return [
      {
        id: 1,
        company: "Google",
        position: "Frontend Developer",
        status: "Interview",
        priority: "High",
        date: "2026-08-20",
      },

      {
        id: 2,
        company: "Microsoft",
        position: "React Developer",
        status: "Applied",
        priority: "Medium",
        date: "2026-08-22",
      },

      {
        id: 3,
        company: "Amazon",
        position: "Software Engineer",
        status: "Rejected",
        priority: "Normal",
        date: "2026-08-18",
      },

      {
        id: 4,
        company: "Meta",
        position: "Frontend Engineer",
        status: "Offer",
        priority: "High",
        date: "2026-08-15",
      },
    ];

  });


  useEffect(() => {

    localStorage.setItem(
      "careerflowApplications",
      JSON.stringify(applications)
    );

  }, [applications]);


  return (
    <>
      <Navbar applications={applications} />

      <Outlet
        context={{
          applications,
          setApplications,
        }}
      />
    </>
  );
}

export default AppLayout;

