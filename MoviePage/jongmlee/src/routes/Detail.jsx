import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import LikeBox from "../components/LikeBox";

function Detail() {
	const [loading, setLoading] = useState(true);
	const [movie, setMovie] = useState(null);
	const {id} = useParams();
	const getMovie = async () => {
		const json = await (
			await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
		).json();
		setMovie(json.data.movie);
		setLoading(false);
		console.log(json.data.movie);
	};
	useEffect(() => {
		getMovie();
	}, []);
	if (loading) {
		return <h1>Loading...</h1>
	}
	return (
		<div>
			<h1>{movie.title} ({movie.year})</h1>
			<img src={movie.large_cover_image} alt={movie.title} />
			<p>{movie.description_full}</p>
			<ul>
				{movie.genres.map(g => (
					<li key={g}>{g}</li>
				))}
			</ul>
			<LikeBox likes={movie.like_count} />
		</div>
		)
}
export default Detail;