import { useEffect, useState, useRef } from "react";
import styles from "../css/search.module.css"; // CSS 모듈 불러오기

export function Search() {
  const [dataList, setDataList] = useState([]);
  const [text, setText] = useState("");
  const [nextPage, setNextPage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const targetRef = useRef();

  // Intersection Observer 설정
  const handleObserver = (entries) => {
    const target = entries[0];
    if (text.length !== 0 && target.isIntersecting && nextPage !== "") {
      console.log("Load more pages");
      setIsLoading(true); // 무한 스크롤 트리거
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    });
    if (targetRef.current) observer.observe(targetRef.current);
    return () => {
      if (targetRef.current) observer.unobserve(targetRef.current);
    };
  }, []);

  useEffect(() => {
    if (isLoading) {
      getYoutube(text);
    }
  }, [isLoading]);

  // YouTube API 호출
  const getYoutube = async (txt) => {
    if (txt.length === 0) return;

    try {
      const apiKey = import.meta.env.VITE_API_FOR_YOUTUBE;
      const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&order=relevance&q=${txt}&key=${apiKey}&maxResults=20&relevanceLanguage=ko${
        nextPage ? `&pageToken=${nextPage}` : ""
      }`;

      console.log("API 호출 URL:", url);
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`API 호출 실패: ${response.status}`);
      }

      const data = await response.json();

      setDataList((prev) =>
        nextPage === "" ? data.items || [] : [...prev, ...data.items || []]
      );
      setNextPage(data.nextPageToken || "");
    } catch (error) {
      console.error("Failed to fetch YouTube data", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {/* 폼 부분 */}
      <form
        className={styles.formContainer}
        onSubmit={(event) => {
          event.preventDefault();
          setNextPage(""); // 초기화
          getYoutube(text); // 폼 제출 시 실행
        }}
      >
        <input
          className={styles.inputField}
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="검색어 입력"
        />
        <button type="submit" className={styles.submitButton}>
          검색
        </button>
      </form>

      {/* 검색 결과 */}
      <ul className={styles.resultContainer}>
        {dataList.map((value, idx) => (
          <div key={idx} className={styles.resultCard}>
            <img
              src={value.snippet.thumbnails.medium.url}
              alt="thumbnail"
              className={styles.resultImage}
            />
            <div className={styles.resultTitle}>
              제목: {value.snippet.title}
            </div>
            <div className={styles.resultChannel}>
              채널: {value.snippet.channelTitle}
            </div>
            <div className={styles.resultDate}>
              업로드 날짜:{" "}
              {new Date(value.snippet.publishTime).toLocaleDateString("ko-KR")}
            </div>
          </div>
        ))}
        {isLoading && <p>now loading...</p>}
        <div ref={targetRef} style={{ height: "10px" }}></div>
      </ul>
    </div>
  );
}

export default Search;
