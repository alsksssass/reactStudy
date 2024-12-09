import { useEffect, useState } from "react";

export function Search(){
    const [dataList, setDataList] = useState([]);
	const [text, setText] = useState("");

    const getYoutube = async (txt) => {
		if(text.length ===0) return;
        try {
            const apiKey = import.meta.env.VITE_API_FOR_YOUTUBE;
			console.log(txt);
			const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${txt}&key=${apiKey}`);
            const data = await response.json();
			console.log(data);
            setDataList(data.items);
        } catch (error) {
			console.error("Failed to fetch YouTube data", error);
		}
	}
	// useEffect(()=>{getYoutube(text)},[text]);	
	return (
		<div>
			<form
				onSubmit={(event) => {
					event.preventDefault();
					getYoutube(text);  // 폼 제출 시 실행
				}}
			>
				<input
					value={text}
					onChange={(event) => setText(event.target.value)}
					placeholder="검색어 입력"
				/>
				<button type="submit">검색</button>
			</form>
			<ul>
				{dataList.map((value, idx) => (
					<li key={idx}>
						<img src={value.snippet.thumbnails.medium.url} alt="thumbnail" />
						<br></br>
						<a>{value.snippet.title}</a>
					</li>
				))}
			</ul>

		</div>
	)
}

export default Search;