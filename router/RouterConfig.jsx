import { createBrowserRouter } from "react-router-dom";

import AppLayout from "../src/components/AppLayout";

import Dashboard from "../pages/Dashboard";
import Applications from "../pages/Applications";
import AddApplication from "../pages/AddApplication";
import ApplicationDetails from "../pages/ApplicationDetails";
import JobAnalyzer from "../pages/JobAnalyzer";
import Skills from "../pages/Skills";
import CareerCenter from "../pages/CareerCenter";
import CareerSimulator from "../pages/CareerSimulator";
const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,

    children: [

      {
        index: true,
        element: <Dashboard />,
      },

      {
        path: "applications",
        element: <Applications />,
      },

      {
  path: "/applications/:id",
  element: <ApplicationDetails />,
},
      {
        path: "applications/new",
        element: <AddApplication />,
      },

{
  path:"/job-analyzer",
  element:<JobAnalyzer />
},
{
  path: "/skills",
  element:<Skills />,
},
{
  path:"/career-center",
  element: <CareerCenter />
},
{
  path:"/career-simulator",
  element:< CareerSimulator />
}

    ],
  },
]);


export default router;