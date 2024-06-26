import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const useAutoLogoutOnInactivity = () => {
  const navigate = useNavigate();

  useEffect(() => {
    let logoutTimer;

    const resetLogoutTimer = () => {
      clearTimeout(logoutTimer);
      logoutTimer = setTimeout(async () => {
        const email = localStorage.getItem("email");
        if (email) {
          try {
            const response = await axios.post(
              `${process.env.REACT_APP_API_URL}users/logout`,
              { email }
            );
            localStorage.removeItem("accessToken");
            localStorage.removeItem("email");
            localStorage.removeItem("userId");
            localStorage.removeItem("buyer_id");
            navigate("/");
            window.location.reload();
          } catch (error) {
            if (error.response) {
              console.error("로그아웃 실패:", error.response.data);
            } else if (error.request) {
              console.error(
                "요청이 만들어졌으나 응답을 받지 못함:",
                error.request
              );
            } else {
              console.error("로그아웃 요청 설정 오류:", error.message);
            }
          }
        }
      }, 600000);
    };

    const handleActivity = () => {
      resetLogoutTimer();
    };

    window.addEventListener("mousemove", handleActivity);
    window.addEventListener("keydown", handleActivity);

    resetLogoutTimer();

    return () => {
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("keydown", handleActivity);
      clearTimeout(logoutTimer);
    };
  }, [navigate]);
};

export default useAutoLogoutOnInactivity;
