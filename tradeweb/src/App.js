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

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppLayout>
        <Routes>
          <Route path="/detail" element={<DetailPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/my-page" element={<MyPage />} />
          <Route path="/write" element={<ProductWritePage />} />
        </Routes>
      </AppLayout>
    </ThemeProvider>
  );
}

export default App;
