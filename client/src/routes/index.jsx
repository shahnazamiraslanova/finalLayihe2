
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
import FavoritesPage from "../pages/client/FavoritesPage";
import CartPage from "../pages/client/CartPage";
import SignUp from "../pages/client/SignUp";
const ROUTES = [
  {
      path: "/",
      element: <Root />,
      children: [
          {
              path: "/",
              element: <Home />
          },
          {
              path: "courses",
              element: <Courses />
          },
          {
              path: "news",
              element: <News />
          },
          {
              path: "favs",
              element: <FavoritesPage />
          },
          {
              path: "cart",
              element: <CartPage />
          },
          {
              path: "programs",
              element: <Porgrams />,
              
          },
          {
              path: "teachers",
              element: <Teachers />
          },
          {
            path: "signup",
            element: <SignUp />
        },
          {
              path: "contact",
              element: <Contact />
          },
          {
              path: "news/:id",
              element: <NewsDetil />
          },
          {
            path: "programs/:id",
            element: <ProgramsDetail />
        }
      ]
  },
  {
      path: "/admin",
      element: <LoginToAdmin />
  },
  {
      path: "/73QmFV5$1cNlDzO!S6p9oWvXr8Kt2yG3JhU*AqIbR7dExP4gTfHnZsYwMeCaB0iL",
      element: <AdminRoot />,
      children: [
          {
              path: "dashboard",
              element: <Dashboard />
          },
          {
              path: "admincourses",
              element: <CoursesAdmin />
          },
          {
              path: "adminteachers",
              element: <TeachersAdmin />
          },
          {
              path: "adminadmins",
              element: <AdminsAdmin />
          },
          {
              path: "adminprograms",
              element: <ProgramsAdmin />
          },
          {
              path: "adminnews",
              element: <NewsAdmin />
          },
          {
              path: "adminusers",
              element: <UsersAdmin />
          },
          {
              path: "admincontacts",
              element: <ContactsAdmin />
          }
      ]
  }
];

export default ROUTES;
