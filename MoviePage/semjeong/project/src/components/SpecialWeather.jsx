import { useEffect, useState } from "react";

const SpecialWeather = ({ list }) => {
  const [rain, setRain] = useState({});
  const [snow, setSnow] = useState({});

  const getSpecialWeather = (weatherStr, setter) => {
    for (let v of list) {
      if (v.IconPhrase.includes(weatherStr)) {
        setter(v);
        return;
      }
    }
  }

  const getDDay = (dday) => {
    const now = new Date();
    const diff = dday - now;
    if (diff < 0)
      return '곧';
    const day = Math.floor(Math.floor(Math.floor(Math.floor(diff / 1000) / 60) / 60) / 24);
    if (day !== 0)
      return day + '일 후';
    const hour = Math.floor(Math.floor(Math.floor(diff / 1000) / 60) / 60);
    if (hour !== 0)
      return hour + '시 후';
    const minute = Math.floor(Math.floor(diff / 1000) / 60);
    return minute + '분 후';
  }

  useEffect(() => {
    if (list.length === 0) return;
    getSpecialWeather('Rain', setRain);
    getSpecialWeather('Snow', setSnow);
  }, [list]);

  return (<div>
    {rain && Object.keys(rain).length !== 0 && (<div>
      <p>{getDDay(new Date(rain.DateTime))} 비</p>
    </div>)}
    {snow && Object.keys(snow).length !== 0 && (<div>
      <p>{ getDDay(new Date(snow.DateTime)) } 눈</p>
    </div>)}
  </div>);
}

export default SpecialWeather;
