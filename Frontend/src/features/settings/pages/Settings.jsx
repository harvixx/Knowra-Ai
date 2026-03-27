// pages/Settings.jsx

import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../../app/store/slices/themeSlice";

function Settings() {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.theme.mode);

  return (
    <div>
      <h2>Settings</h2>

      <p>Current Theme: {mode}</p>

      <button onClick={() => dispatch(toggleTheme())}>
        Change Theme
      </button>
    </div>
  );
}

export default Settings;