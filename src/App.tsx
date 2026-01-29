import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";

import "./index.css";
import Snowfall from "react-snowfall";

function App() {
  return (
    <BrowserRouter>
      <Snowfall />
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
