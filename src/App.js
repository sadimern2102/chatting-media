import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import Registration from "./pages/registration/Registration";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import Msg from "./pages/message/Msg";
import Notification from "./pages/notification/Notification";
import Setting from "./pages/setting/Setting";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Home />} />
        <Route path="/message" element={<Msg />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/setting" element={<Setting />} />
      </>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
