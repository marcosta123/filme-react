  // import './App.css'
  import Button from "./components/Buttons";
import PopularMovies from "./services/MoviesApi";


  function App() {
    return (
      <div>
        <Button text="Movies" variant="primary"/>
        <Button text="TV" variant="secondary"/>
        <PopularMovies/>
      </div>
    );
  }
export default App