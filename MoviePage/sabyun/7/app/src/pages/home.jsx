import YouTubeSercher from "../components/youTubeSearcher"

export function Home(){
	return(
		<div style={{ display:'grid', justifyItems:'center'}}>
			<h1>YOUTUBE downloader</h1>
			<YouTubeSercher />
		</div>
	)
}

export default Home;