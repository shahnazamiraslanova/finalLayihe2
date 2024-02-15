import AdminRoot from "../pages/admin/Adminroot";
import Dashboard from "../pages/admin/Dashboard";
import Contact from "../pages/client/Contact";
import Courses from "../pages/client/Courses";
import Home from "../pages/client/Home";
import News from "../pages/client/News";
import Porgrams from "../pages/client/Porgrams";
import ProgramsDetail from "../pages/client/ProgramsDetail";
import Root from "../pages/client/Root";
import Teachers from "../pages/client/Teachers";
import NewsDetil from "../pages/client/NewsDetail"

const ROUTES = [
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "",
          element: <Home />,
        },
        {
          path: "courses",
          element: <Courses />,
        },
        {
          path: "news",
          element: <News />,
        },
        {
          path: "programs",
          element: <Porgrams />,
          children:[{
            
          }]
        },
        {
          path: "teachers",
          element: <Teachers />,
        },
        {
          path: "contact",
          element: <Contact />,
        },
        {
          path:"programs/:id",
          element:<ProgramsDetail/>
        },
        {
          path:"news/:id",
          element:<NewsDetil/>
        }
        
       
      ],
    },
    {
      path: "/admin",
      element: <AdminRoot />,
      children: [
        {
          path: "",
          element: <Dashboard />,
        }
       
      ],
    },
  ];
  
  export default ROUTES;