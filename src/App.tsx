  // import './App.css'
  import Button from "./components/Buttons";
import PopularMovies from "./services/MoviesApi";


  function App() {
    return (
      <div>
        <Button text="Movies" variant="primary"/>
        <Button text="TV" variant="secondary"/>
        <PopularMovies type="popular"/>
        <PopularMovies type="top_rated"/>
        <PopularMovies type="now_playing"/>
        <PopularMovies type="upcoming"/>
      </div>
    );
  }
export default App