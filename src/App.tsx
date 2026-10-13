import { Link, Route, Routes } from "react-router-dom";
import "./Buttons.css";
import FilmPage from "./pages/FilmPage";
import SeriePage from "./pages/SeriePage";

function App() {
  return (
    <div>
      <Link to="/" className="media-switch media-switch-primary">
        Movies
      </Link>
      <Link to="/series" className="media-switch media-switch-secondary">
        TV
      </Link>

      <Routes>
        <Route path="/" element={<FilmPage />} />
        <Route path="/series" element={<SeriePage />} />
      </Routes>
    </div>
  );
}

export default App;