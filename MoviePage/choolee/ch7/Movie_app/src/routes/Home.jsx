import { useState, useEffect } from "react";
import Movie from "../components/Movie";

function Home() {
	const [loading, setLoading] = useState(false);
	const [movies, setMovies] = useState([])
	const getMovies = async () => {
		const response = await fetch(
			"https://yts.mx/api/v2/list_movies.json?minimum_rating=8.8&sort_by=year"
		);
		const json = await response.json();
		setMovies(json.data.movies);
		setLoading(false);
	};
	useEffect(() => {
		getMovies()
	}, [])
	// useEffect(() => {
	// 	fetch("https://yts.mx/api/v2/list_movies.json?minimum_rating=8.8&sort_by=year")
	// 	.then((response) => response.json())
	// 	.then((json) => {
	// 		setMovies(json.data.movies);
	// 		setLoading(false);
	// 	});
	// }, [])
	console.log(movies);
	return (
		<>
			{loading ? <h1>Loading...</h1> :
				<div>
					{movies.map((movie) => (
						<Movie
							key={movie.id}
							id={movie.id}
							coverImag={movie.medium_cover_image}
							title={movie.title}
							summarty={movie.summary}
							genres={movie.genres} />
					))}
				</div>}
		</>
	)
}
export default Home;