import { useEffect, useState } from "react";
import Movie from "../components/Movie";

function Home() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const getMovies = async () => {
    const json = await (await fetch("https://yts.mx/api/v2/list_movies.json?minimum_rating=9&sort_by=year")).json();
    setMovies(json.data.movies);
    setLoading(false);
  }
  useEffect(() => {
    getMovies();
  }, []);
  return (
    <div>
      <h1>Movies</h1>
      { loading ? (<p>
        loading...
      </p>) : (<div>
        {movies.map(v =>
          <Movie key={v.id} coverImg={v.medium_cover_image}
            title={v.title} summary={v.summary} genres={v.genres}
            id={v.id}
        />)}
        </div>)
      }
    </div>
  );
}

export default Home;
