import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import App from "../App";
import Home from "../pages/Home"
import SearchPage from "../pages/SearchPage";
import Register from "../pages/Register";
import Login from "../pages/Login";
const router = createBrowserRouter([
  {
    path: "/",
    element : <App/>,
    children :[
        {
            path :"",
            element :<Home/>
        },
        {
          path:"search",
          element:<SearchPage/>
        },
        {
          path:"login",
          element: <Login/>
        },
        {
          path:"register",
          element:<Register/>
        }
    ]
  },
]);

export default router ;
