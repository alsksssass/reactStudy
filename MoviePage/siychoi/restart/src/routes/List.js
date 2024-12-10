import { useEffect, useState } from "react";
import SearchRequirement from "../components/SearchRequirement";
import Topmenu from "../components/TopMenuForList";
import BottomInfo from "../components/BottomInfo";
import { Container } from "@mui/material";

function List() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <div>
      <Topmenu />

      {loading ? <h1>Loading...</h1> :
      <Container>
        <SearchRequirement />
        <BottomInfo />
        </Container>
      }

    </div>
  );
}

export default List;