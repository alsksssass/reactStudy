import { useParams } from "react-router";
import { useEffect, useState } from "react";

function Detail() {
  const id = useParams().id;
  const [movies, setMovies] = useState([]);
  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setMovies(json.data.movie);
  };
  useEffect(() => {
    getMovie();
  }, []);
  console.log(movies);
  return (
    <div>
      <img src={movies.medium_cover_image}></img>
      <h2>{movies.title}</h2>
      <h2>{movies.year}</h2>
      <p>{movies.summary}</p>
      <p>{movies.genres}</p>
    </div>
  );
}

export default Detail;
