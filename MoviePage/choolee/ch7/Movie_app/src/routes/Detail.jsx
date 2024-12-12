import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router";

function Detail() {
	const id = useParams().id;
	const [detail, setDetail] = useState({});
	// const [flip, setFlip] = useState(false);
	// const onClick = () => useState((flip) => !flip);
	const getMovies = async () => {
		const json = await (await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)).json();
		setDetail(json.data.movie);
	};
	useEffect(() => {
		getMovies();
	}, []);

	return (
		<div>
			<h1>detail</h1>
			<h1>{detail.description_full}</h1>
			{/* <button onClick={onClick}>detail</button> */}
		</div>
	);
}

export default Detail;