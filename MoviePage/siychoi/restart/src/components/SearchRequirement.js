import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import RoomIcon from '@mui/icons-material/Room';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Alert from '@mui/material/Alert';
import { useState, useEffect, useRef } from "react";
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import processedData from './JsonData';
import { Link, useLocation } from 'react-router-dom';
import TextField from '@mui/material/TextField';

const PAGE_SIZE = 40;
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function isTodayBeforeStartDate(todayTimestamp, eventStartDate) {
  const today = new Date(todayTimestamp);
  const startDate = new Date(eventStartDate);
  return today < startDate;
}

const categories = [
  '전체',
  '교육/체험',
  '국악',
  '콘서트',
  '클래식',
  '독주/독창회',
  '무용',
  '뮤지컬/오페라',
  '연극',
  '영화',
  '전시/미술',
  '축제',
  '기타'
];

const regions = [
  '전체',
  '강남구',
  '강동구',
  '강북구',
  '강서구',
  '관악구',
  '광진구',
  '구로구',
  '금천구',
  '노원구',
  '도봉구',
  '동대문구',
  '동작구',
  '마포구',
  '서대문구',
  '서초구',
  '성동구',
  '성북구',
  '송파구',
  '양천구',
  '영등포구',
  '용산구',
  '은평구',
  '종로구',
  '중구',
  '중랑구'
];

const themes = [
  '전체',
  '어린이/청소년 문화행사',
  '가족 문화행사',
  '어르신 문화행사',
  '여성 문화행사',
  '문화가 있는 날',
  '기타'
]

export default function SearchRequirement() {
  const [region, setRegion] = useState('전체');
  const [category, setCategory] = useState('전체');
  const [theme, setTheme] = useState('전체');
  const [isFreeChecked, setIsFreeChecked] = useState(false);
  const [isBeforeEndChecked, setIsBeforeEndChecked] = useState(true);
  const [eventList, setEventList] = useState([]);
  const [btnClicked, setBtnClicked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [lessData, setLessData] = useState(true);
  const [searchValue, setSearchValue] = useState('');
  const scrollRef = useRef();
  const location = useLocation();
  const todayTimestamp = Date.now(); // 오늘의 타임스탬프

  const regionChange = (event) => {
    setRegion(event.target.value);
  };

  const categoryChange = (event) => {
    setCategory(event.target.value);
  };

  const themeChange = (event) => {
    setTheme(event.target.value);
  };

  const freeCheckChange = (event) => {
    setIsFreeChecked(event.target.checked);
  };

  const beforeStartCheckChange = (event) => {
    setIsBeforeEndChecked(event.target.checked);
  };

  const searchButtonClick = () => {
    setBtnClicked(prevClicked => !prevClicked);
    setLessData(true);
    handleScrollView();
    setPage(2);
  }

  const searchValueChagne = (event) => {
    setSearchValue(event.target.value)
  }

  const handleScrollView = () => {
    scrollRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      searchButtonClick();
    }
  }
  const filterData = (data) => {
    let tempApiDataList = data;
    if (isBeforeEndChecked) {
      tempApiDataList = tempApiDataList.filter(event =>
        isTodayBeforeStartDate(todayTimestamp, event.end_date)
      )
    }
    if (isFreeChecked) {
      tempApiDataList = tempApiDataList.filter(event =>
        event.is_free === "무료"
      )
    }
    if (region !== '전체' && category === '전체' && theme === '전체') {
      tempApiDataList = tempApiDataList.filter(event =>
        event.guname === region
      )
    }
    else if (region === '전체' && category !== '전체' && theme === '전체') {
      tempApiDataList = tempApiDataList.filter(event =>
        event.codename === category
      )
    }
    else if (region === '전체' && category === '전체' && theme !== '전체') {
      tempApiDataList = tempApiDataList.filter(event =>
        event.themecode === theme
      )
    }
    else if (region !== '전체' && category !== '전체' && theme === '전체') {
      tempApiDataList = tempApiDataList.filter(event =>
        event.codename === category &&
        event.guname === region
      )
    }
    else if (region === '전체' && category !== '전체' && theme !== '전체') {
      tempApiDataList = tempApiDataList.filter(event =>
        event.codename === category &&
        event.themecode === theme
      )
    }
    else if (region !== '전체' && category === '전체' && theme !== '전체') {
      tempApiDataList = tempApiDataList.filter(event =>
        event.guname === region &&
        event.themecode === theme
      )
    }
    else if (region !== '전체' && category !== '전체' && theme !== '전체') {
      tempApiDataList = tempApiDataList.filter(event =>
        event.guname === region &&
        event.codename === category &&
        event.themecode === theme
      )
    }

    tempApiDataList = tempApiDataList.filter(event => {
      for (const key in event) {
        const value = event[key];
        if (value !== null && value !== undefined && value.toString().includes(searchValue)) {
          return true;
        }
      }
      return false;
    });
    return tempApiDataList;
  };

  const loadMoreData = () => {
    if (loading) return;

    setLoading(true);
    const filteredData = filterData(processedData);
    const start = (page - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    const newData = filteredData.slice(start, end);
    setEventList(prevData => [...prevData, ...newData]);
    setPage(prevPage => prevPage + 1);
    setLoading(false);
  };
  useEffect(() => {
    loadMoreData();
    const value = location.state;
    if (typeof (value) === 'boolean')
      setIsFreeChecked(value);
    else if (categories.includes(value))
      setCategory(value);
    else if (regions.includes(value))
      setRegion(value);
    else if (themes.includes(value))
      setTheme(value);
    if (value !== null)
      searchButtonClick();
  }, [])

  useEffect(() => {
    if (!processedData) return;

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };

  }, [page, btnClicked]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    ) {
      return;
    }
    loadMoreData();
  };
  
  useEffect(() => {
    const filteredData = filterData(processedData);
    setEventList(filteredData.slice(0, PAGE_SIZE)); // 페이지당 초기 데이터 설정
    if (filteredData.length === 0) {
      setLessData(false);
    }
  }, [btnClicked])

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:py-4" >
        <div className='flex flex-wrap items-center justify-between md:space-y-0 md:space-x-4'>
          <FormControl className="w-full md:w-1/4 md:flex-1" sx={{ m: 1 }}>
            <InputLabel id="demo-multiple-name-region">
              <RoomIcon sx={{ mr: 1 }} />지역
            </InputLabel>
            <Select
              labelId="demo-multiple-name-region"
              id="demo-multiple-name-region"
              value={region}
              onChange={regionChange}
              input={<OutlinedInput autoFocus={true} label="regionnn" />}
              MenuProps={MenuProps}
            >
              {regions.map((name) => (
                <MenuItem
                  key={name}
                  value={name}
                >
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl className="w-full md:w-1/4 md:flex-1" sx={{ m: 1, }}>
            <InputLabel id="demo-multiple-name-category">
              <LiveTvIcon sx={{ mr: 1 }} />분류
            </InputLabel>
            <Select
              labelId="demo-multiple-name-category"
              id="demo-multiple-name-category"
              value={category}
              onChange={categoryChange}
              input={<OutlinedInput autoFocus={true} label="category" />}
              MenuProps={MenuProps}
            >
              {categories.map((name) => (
                <MenuItem
                  key={name}
                  value={name}
                >
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl className="w-full md:w-1/4 md:flex-1" sx={{ m: 1 }}>
            <InputLabel id="demo-multiple-name-region">
              <RoomIcon sx={{ mr: 1 }} />테마
            </InputLabel>
            <Select
              labelId="demo-multiple-name-region"
              id="demo-multiple-name-region"
              value={theme}
              onChange={themeChange}
              input={<OutlinedInput autoFocus={true} label="themeee" />}
              MenuProps={MenuProps}
            >
              {themes.map((name) => (
                <MenuItem
                  key={name}
                  value={name}
                >
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControlLabel labelPlacement="start" control={<Checkbox checked={isFreeChecked} onChange={freeCheckChange} />} label="무료행사" />
          <FormControlLabel labelPlacement="start" control={<Checkbox checked={isBeforeEndChecked} onChange={beforeStartCheckChange} />} label="종료전 행사" />
          <button
            className="ml-5 w-24 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={searchButtonClick}>
            <ManageSearchIcon />   검색
          </button>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 py-2 sm:py-4" >
        <div className='flex flex-wrap items-center justify-end md:space-y-0 md:space-x-4'>
          <TextField className="w-80" onKeyDown={handleKeyPress} onChange={searchValueChagne} id="search-event" label="검색어를 입력하세요." variant="standard" />
        </div>
      </div>
      <div ref={scrollRef}>
        {processedData ?
          <>
            <div className="bg-white">
              <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-6 lg:max-w-7xl lg:px-8">
                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                  {eventList.map((product, index) => (
                    <Link to={`/detail/${product.id}`} className="group">
                      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                        <img
                          src={product.main_img}
                          alt={product.title}
                          className=" h-60 w-full object-cover object-center group-hover:opacity-75"
                        />
                      </div>
                      <p className="mt-1 text-lg font-medium text-gray-900">{product.title}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </>
          : null}
      </div>
      {lessData ? null :
        <div className="flex justify-center items-center">
          <Alert severity="error">불러올 내용이 없습니다. 검색 조건을 변경해주세요.</Alert>
        </div>}
    </>
  );
}