import { useState, useEffect } from "react";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8081";

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) return;

    const controller = new AbortController();
    const token = localStorage.getItem("authToken");

    if (!token) {
      console.warn("🔒 useFetch: 인증 토큰이 없습니다.");
      setError("로그인이 필요합니다.");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}${url}`, {
          headers: { Authorization: `Bearer ${token}` },
          signal: controller.signal,
        });
        setData(response.data);
      } catch (err) {
        if (!axios.isCancel(err)) {
          console.error("❗ useFetch 요청 실패:", err);
          if (err.response?.status === 401) {
            setError("인증 실패: 다시 로그인해주세요.");
            localStorage.removeItem("authToken");
            localStorage.removeItem("user");
          } else {
            setError(err.response?.data?.message || err.message);
          }
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    return () => controller.abort();
  }, [url]);

  return { data, loading, error };
}

export default useFetch;
