import logo from './logo.svg';
import './App.css';
import MyPage from './pages/myPage/MyPage';
import { Route, Routes } from "react-router-dom";
import AppLayout from './components/common/AppLayout';

function App() {
  return (
      <AppLayout>
        <Routes>
          <Route path="/my-page" element={<MyPage />} />
        </Routes>
      </AppLayout>
  );
}

export default App;
