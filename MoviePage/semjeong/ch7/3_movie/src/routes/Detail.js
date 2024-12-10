import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Detail = () => {
	const id = useParams().id;
	const [loading, setLoading] = useState(true);
	const [movie, setMovie] = useState({});
	const getMovie = async () => {
		const res = await (await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)).json();
		setMovie(res.data.movie);
		setLoading(false);
	};
	useEffect(() => {
		getMovie();
	}, []);
	return (<div>
		{ loading ? <h2>loading...</h2> :
		<div>
			<h1>{movie.title}</h1>
			<img src={movie.large_cover_image} alt={movie.title} />
			<p>Year: {movie.year}</p>
			<p>Rating: {movie.rating}/10</p>
			<p>Runtime: {movie.runtime}</p>
			<p>Genres: {movie.genres.join(", ")}</p>
			<p>{movie.description_full}</p>
		</div>}
	</div>);
}

export default Detail;