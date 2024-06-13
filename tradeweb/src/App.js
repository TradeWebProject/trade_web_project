import logo from "./logo.svg";
import { theme } from "./styles/theme";
import { ThemeProvider } from "styled-components";
import "./App.css";
import MyPage from "./pages/myPage/MyPage";
import Login from "./pages/signIn/LoginPage";
import Signup from "./components/userAccount/Signup";
import DetailPage from "./pages/detail/DetailedPage";
import { Route, Routes } from "react-router-dom";
import AppLayout from "./components/common/AppLayout";
import ProductWritePage from "./pages/productWritePage/ProductWritePage";
import SearchResultPage from "./pages/search/SearchResultPage";
import Mainpage from "./pages/main/MainPage";

function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/detail" element={<DetailPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/my-page" element={<MyPage />} />
        <Route path="/write" element={<ProductWritePage />} />
        <Route path="/search" element={<SearchResultPage />} />
        <Route path="/" element={<Mainpage />} />
      </Routes>
    </AppLayout>
  );
}

export default App;
