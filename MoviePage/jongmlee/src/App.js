import Button from "./Button";
import styles from "./App.module.css";
import { useState, useEffect } from "react";

function App() {
  const [counter, setCounter] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [searchResult, setSearchResult] = useState("");
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [loading, setLoading] = useState(false);

  const onChange = (event) => setKeyword(event.target.value);

  const fetchChatGPTResponse = async (query) => {
    try {
      setLoading(true);
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer `, // 환경 변수로 교체
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: query }],
        }),
      });

      const data = await response.json();
      return data.choices[0]?.message?.content || "No response from ChatGPT.";
    } catch (error) {
      console.error("Error fetching ChatGPT response:", error);
      return "Error occurred while fetching ChatGPT response.";
    } finally {
      setLoading(false); // 로딩 종료
    }
  };

  const onSearch = async () => {
    if (keyword.length > 5) {
      const response = await fetchChatGPTResponse(keyword);
      setSearchResult(response);
    } else {
      setSearchResult("Keyword must be at least 6 characters long.");
    }
  };

  const toggleTimer = () => setIsTimerRunning((prev) => !prev);

  useEffect(() => {
    let timer;
    if (isTimerRunning) {
      timer = setInterval(() => {
        setCounter((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isTimerRunning]);

  return (
    <div className={styles.container}>
      <div className={styles.searchSection}>
        <input
          value={keyword}
          onChange={onChange}
          type="text"
          placeholder="Type at least 6 characters..."
          className={styles.input}
        />
        <Button onClick={onSearch} text={loading ? "Loading..." : "Search"} />
        <p>{searchResult}</p>
      </div>
      <div className={styles.counterSection}>
        <h1>Timer: {counter}s</h1>
        <Button onClick={toggleTimer} text={isTimerRunning ? "Pause" : "Start"} />
      </div>
    </div>
  );
}

export default App;