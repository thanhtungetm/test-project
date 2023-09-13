import App from "../App";
import History from "../pages/History";
import Login from "../pages/Login";
import Quiz from "../pages/Quiz";
import RandomQuiz from "../pages/RandomQuiz";
import Signup from "../pages/Signup";
import Test from "../pages/Test";

const routes = [
    {
      path: "/login",
      element: <Login/>,
    },
    {
      path: "/signup",
      element: <Signup/>,
    },
    {
        path: "/",
        element: <App />
    },
    {
        path: "/quiz",
        element: <RandomQuiz />
    },
    {
        path: "/test",
        element: <Test />
    },
    {
        path: "/history",
        element: <History />
    }
  ]

  export default routes