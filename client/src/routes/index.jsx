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
import NewsDetil from "../pages/client/NewsDetail";
import CoursesAdmin from "../pages/admin/CoursesAdmin";
import TeachersAdmin from "../pages/admin/TeachersAdmin";
import AdminsAdmin from "../pages/admin/AdminsAdmin";
import ProgramsAdmin from "../pages/admin/ProgramsAdmin";
import NewsAdmin from "../pages/admin/NewsAdmin";
import UsersAdmin from "../pages/admin/UsersAdmin";
import ContactsAdmin from "../pages/admin/ContactsAdmin";
import LoginToAdmin from "../pages/admin/LoginToAdmin";

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
          children: [
            {
              path: ":id",
              element: <ProgramsDetail />
            }
          ]
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
          path: "news/:id",
          element: <NewsDetil />
        }
      ],
    },
    {
      path: "/admin",
      element: <LoginToAdmin />,
    },
    {
      path: "/73QmFV5$1cNlDzO!S6p9oWvXr8Kt2yG3JhU*AqIbR7dExP4gTfHnZsYwMeCaB0iL",
      element: <AdminRoot />,
      children: [
        
        {
          path: "dashboard",
          element: <Dashboard />,
        },
        {
          path: "admincourses",
          element: <CoursesAdmin />,
        },
        {
          path: "adminteachers",
          element: <TeachersAdmin />,
        },
        {
          path: "adminadmins",
          element: <AdminsAdmin />,
        },
        {
          path: "adminprograms",
          element: <ProgramsAdmin />,
        },
        {
          path: "adminnews",
          element: <NewsAdmin />,
        },
        {
          path: "adminusers",
          element: <UsersAdmin />,
        },
        {
          path: "admincontacts",
          element: <ContactsAdmin />,
        }
      ],
    },
  ];

export default ROUTES;
