import { useSelector } from "react-redux";
import { useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";

function App() {
  const mode = useSelector((state) => state.theme.mode);

  useEffect(() => {
    document.body.classList.remove("light", "dark");
    document.body.classList.add(mode);
  }, [mode]);

  return (
    <div >
      <AppRoutes />
    </div>
  );
}

export default App