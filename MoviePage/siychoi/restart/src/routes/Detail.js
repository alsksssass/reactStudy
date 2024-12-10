import { useEffect, useState} from "react";
import Container from '@mui/material/Container';
import EventDetail from "../components/EventDetail";
import NaverMap from "../components/NaverMap";
import OtherEvents from "../components/OtherEvents";
import Topmenu from "../components/TopMenu";
import BottomInfo from "../components/BottomInfo";

function Detail() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <div>
      <Topmenu />
      {loading ? <h1>Loading...</h1> :
        <Container>
          <EventDetail />
          <NaverMap />
          <OtherEvents />
          <BottomInfo />
        </Container>
      }
    </div>
  );
}

export default Detail;