import { useParams, useLocation } from "react-router";
import styles from "../css/downloadSetPages.module.css";
export function DownloadSetPage(){
	const params = useParams();
	const {url} = params;
	console.log(params);
	// const location = useLocation();
	// const extraParam = new URLSearchParams(location.search);
	// const title = extraParam.get('title');
	
	const location = useLocation();
	const { title } = location.state || {};
	
	console.log(title);
	const embedUrl = `https://www.youtube.com/embed/${url}`;
	return (
		<div>
		  <div className={styles.videoContainer}>
			<iframe
			  title="YouTube Video Player"
			  className={styles.videoFrame}
			  src={embedUrl}
			  allow="autoplay; encrypted-media"
			  allowFullScreen
			></iframe>
		  </div>
		  <div className={styles.titleContainer}>
			<span className={styles.videoTitle}>{title}</span>
		  </div>
		</div>
	  );
}

export default DownloadSetPage;