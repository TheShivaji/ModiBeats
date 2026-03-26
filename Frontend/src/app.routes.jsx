import { createBrowserRouter } from "react-router-dom";
import Home from "./feature/auth/pages/hOME.JSX";
import Login from "./feature/auth/pages/Login"
import Signup from "./feature/auth/pages/Signup"
import Protected from "./feature/auth/components/ProtectRoute";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Protected><Home/></Protected>,
    },
    {
        path: "/signup",
        element: <Signup />
    },
    {
        path: "/login",
        element: <Login />
    }
]);

export default router;