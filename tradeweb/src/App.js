import "./App.css";
import MyPage from "./pages/myPage/MyPage";
import Login from "./pages/signIn/LoginPage";
import Signup from "./components/userAccount/Signup";
import DetailPage from "./pages/detail/DetailedPage";
import { Route, Routes } from "react-router-dom";
import AppLayout from "./components/common/AppLayout";
import ProductWritePage from "./pages/productWritePage/ProductWritePage";
import SearchResultPage from "./pages/search/SearchResultPage";
import ReviewPage from "./pages/reviewPage/reviewPage";
import ProductDetailManagementPage from "./pages/productDetailManagementPage/ProductDetailManagementPage";
import MainPage from "./pages/main/MainPage";

function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/detail" element={<DetailPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/my-page" element={<MyPage />} />
        <Route path="/write" element={<ProductWritePage />} />
        <Route
          path="/product/management/detail"
          element={<ProductDetailManagementPage />}
        />
        <Route path="/search" element={<SearchResultPage />} />
        <Route path="/review" element={<ReviewPage />} />
        <Route path="/" element={<MainPage />} />
      </Routes>
    </AppLayout>
  );
}

export default App;
