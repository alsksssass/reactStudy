import { useNavigate, Link } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

function Topmenu() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="w-full">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <button onClick={goBack}>
            <ArrowBackIcon />
          </button>
          <Link className="font-semibold text-2xl border-b-2 border-black" to="/">
            스케줄서울
          </Link>
          <Link to="/list">
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
              <FormatListBulletedIcon />
            </IconButton>
          </Link>
        </div>
      </div>
    </div>
  )

}

export default Topmenu;