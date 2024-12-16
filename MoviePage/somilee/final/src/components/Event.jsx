import { Link } from "react-router";
import "./Event.css";

function Event({ idx, img, title }) {
  return (
    <div>
      <img src={img} className="image-container"></img>
      <h2>
        <Link to={`/event/${idx}`}>{title}</Link>
      </h2>
    </div>
  );
}
export default Event;
