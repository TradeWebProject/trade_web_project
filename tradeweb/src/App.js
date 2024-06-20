import logo from "./logo.svg";
import { theme } from "./styles/theme";
import { ThemeProvider } from "styled-components";
import "./App.css";
import MyPage from "./pages/myPage/MyPage";
import Login from "./pages/signIn/LoginPage";
import DetailPage from "./pages/detail/DetailedPage";
import { Route, Routes } from "react-router-dom";
import AppLayout from "./components/common/AppLayout";
import ProductWritePage from "./pages/productWritePage/ProductWritePage";
import SearchResultPage from "./pages/search/SearchResultPage";
import Mainpage from "./pages/main/MainPage";
import ReviewPage from "./pages/reviewPage/reviewPage";
import ProductDetailManagementPage from "./pages/productDetailManagementPage/ProductDetailManagementPage";
import TestDetailPage from "./pages/testDetail/TestDetailPage";

function App() {
  return (
    <AppLayout>
      <Routes>

        <Route path="/test/detail/:productId" element={<TestDetailPage />} />
        <Route path="/detail/:productId" element={<DetailPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/my-page" element={<MyPage />} />
        <Route path="/write" element={<ProductWritePage />} />
        <Route
          path="/product/management/detail/:productId"
          element={<ProductDetailManagementPage />}
        />
        <Route path="/search" element={<SearchResultPage />} />
        <Route path="/" element={<Mainpage />} />
        <Route path="/review" element={<ReviewPage />} />
      </Routes>
    </AppLayout>
  );
}

export default App;
