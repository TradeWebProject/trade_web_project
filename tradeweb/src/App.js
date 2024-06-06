import logo from "./logo.svg";
import "./App.css";
import MyPage from "./pages/myPage/MyPage";
import Login from "./pages/signIn/LoginPage";
import Signup from "./components/userAccount/Signup";
import DetailPage from "./pages/detail/DetailedPage";
import { Route, Routes } from "react-router-dom";
import AppLayout from "./components/common/AppLayout";

function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/detail" element={<DetailPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/my-page" element={<MyPage />} />
      </Routes>
    </AppLayout>
  );
}

export default App;
