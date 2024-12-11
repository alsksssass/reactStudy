import React from 'react';
import '../LikeBox.css';

function LikeBox({ likes }) {
	return (
		<div className="like-counter">
			<span className="heart">❤️</span>
			<span className="count">{likes}</span>
		</div>
	)
}
export default LikeBox;