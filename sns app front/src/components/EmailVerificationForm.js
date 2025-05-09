// src/components/EmailVerificationForm.js
import React, { useState } from "react";
import axios from "axios";

function EmailVerificationForm({ email, onSuccess }) {
  const [code, setCode] = useState("");
  const [status, setStatus] = useState({ loading: false, message: "", error: "" });

  const handleVerify = async () => {
    setStatus({ loading: true, message: "", error: "" });
    try {
      const response = await axios.post("/api/email/verify", { email, code });
      if (response.data.verified) {
        setStatus({ loading: false, message: "✅ 인증 성공! 계속 진행하세요.", error: "" });
        onSuccess();
      } else {
        setStatus({ loading: false, message: "", error: "❌ 인증 코드가 일치하지 않습니다." });
      }
    } catch (err) {
      console.error("이메일 인증 실패:", err);
      setStatus({ loading: false, message: "", error: "❌ 서버 오류가 발생했습니다." });
    }
  };

  return (
    <div style={{ marginTop: "12px" }}>
      <h4>이메일 인증</h4>
      <input
        type="text"
        placeholder="인증 코드 입력"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        disabled={status.loading}
        style={{ marginRight: "10px" }}
      />
      <button onClick={handleVerify} disabled={status.loading || code.trim() === ""}>
        {status.loading ? "확인 중..." : "인증 확인"}
      </button>

      {status.message && <p style={{ color: "green", marginTop: "8px" }}>{status.message}</p>}
      {status.error && <p style={{ color: "red", marginTop: "8px" }}>{status.error}</p>}
    </div>
  );
}

export default EmailVerificationForm;
