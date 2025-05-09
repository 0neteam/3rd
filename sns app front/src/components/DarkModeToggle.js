import { useDarkMode } from "../context/DarkModeContext";

function DarkModeToggle() {
  const { darkMode, setDarkMode } = useDarkMode();

  const toggleMode = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <button onClick={toggleMode} style={{ marginLeft: "20px", cursor: "pointer" }}>
      {darkMode ? "🌞 라이트 모드" : "🌙 다크 모드"}
    </button>
  );
}

export default DarkModeToggle;
