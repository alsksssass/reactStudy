import { useState, useEffect } from "react";
import Container from '@mui/material/Container';
import SimpleSlider from "../components/SimpleSlider";
import Topmenu from "../components/TopMenuForHome";
import RecommendEvent from "../components/RecommendEvent";
import BottomInfo from "../components/BottomInfo";

function Home() {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    setLoading(false);
  },[]);

  return (
    <div>
      <Topmenu />
      {loading ? <h1>Loading...</h1> :
        <Container>
          <SimpleSlider />
          <RecommendEvent />
          <BottomInfo />
        </Container>
      }
    </div>
  );
}

export default Home;

