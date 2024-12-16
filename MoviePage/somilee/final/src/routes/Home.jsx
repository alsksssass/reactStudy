import { useState, useEffect } from "react";
import Event from "../components/Event";

function Home() {
  const [loading, setLoading] = useState(true);
  const [event, setEvent] = useState([]);
  const getEvent = async () => {
    const json = await (
      await fetch(
        "http://openapi.seoul.go.kr:8088/6875534354736f6d313035474d6b6a7a/json/culturalEventInfo/1/5"
      )
    ).json();
    setEvent(json.culturalEventInfo.row);
    setLoading(false);
  };
  console.log(event);
  useEffect(() => {
    getEvent();
  }, []);

  return (
    <div>
      {loading ? (
        <h1>loading...</h1>
      ) : (
        <div>
          <h1>문화체험 리스트</h1>
          {event.map((e, idx) => (
            <Event key={idx} idx={idx} img={e.MAIN_IMG} title={e.TITLE} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
