import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import "./Detail.css";

function Detail() {
  const idx = useParams().idx;
  const [event, setEvent] = useState([]);
  const getEvent = async () => {
    const json = await (
      await fetch(
        `http://openapi.seoul.go.kr:8088/6875534354736f6d313035474d6b6a7a/json/culturalEventInfo/1/5`
      )
    ).json();
    setEvent(json.culturalEventInfo.row[parseInt(idx, 10)]);
  };
  useEffect(() => {
    getEvent();
  }, []);
  console.log(event);
  return (
    <div>
      <p>{event.CODENAME}</p>
      <p>{event.TITLE}</p>
      <img src={event.MAIN_IMG} className="detail_image-container"></img>
      <p>행사기간: {event.DATE}</p>
      <p>장소: {event.PLACE}</p>
      <p>
        웹사이트:
        <Link to={event.ORG_LINK}>웹사이트 바로가기</Link>
      </p>
      <p>요금: {event.USE_FEE}</p>
    </div>
  );
}

export default Detail;
