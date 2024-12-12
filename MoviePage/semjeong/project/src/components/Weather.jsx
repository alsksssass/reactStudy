import { useEffect, useState } from "react";
// import { get12HourWeather, get5DayWeather, getLocation } from "../utils/accuweatherAPI";
import { get12HourWeather, get5DayWeather, getLocation } from "../utils/weatherDummy";
import WeatherList from "./WeatherList";
import DailyWeather from "./DailyWeather";
import HourlyWeather from "./HourlyWeather";

const Weather = () => {
	const [lat, setLat] = useState(0);
	const [lon, setLon] = useState(0);
	const [location, setLocation] = useState({});
	const [weather5Days, setWeather5Days] = useState([]);
	const [weahter12Hours, setWeather12Hours] = useState([]);

	useEffect(() => {
		navigator.geolocation.getCurrentPosition((position) => {
			setLat(position.coords.latitude);
			setLon(position.coords.longitude);
			console.log(lat, lon);
		});
	}, []);
	useEffect(() => {
		if (lat === 0 && lon === 0) return;
		getLocation(lat, lon)
			.then(loc => setLocation({key: loc.Key, name: loc.LocalizedName}))
			.catch(err => console.log(err, 'location'));
	}, [lat, lon]);
	useEffect(() => {
		if (location === "") return;
		get12HourWeather(location.key)
			.then(weatherArr => setWeather12Hours(weatherArr))
			.catch(err => console.log(err, '12h weather'));
		get5DayWeather(location.key)
			.then(weatherObj => setWeather5Days(weatherObj.DailyForecasts))
			.catch(err => console.log(err, '5d weather'));
	}, [location]);
	return (<div>
		<h1>Weather</h1>
		<div>
			<HourlyWeather list={weahter12Hours}/>
			<DailyWeather list={weather5Days}/>
			{lat},{lon}
		</div>
	</div>);
}

export default Weather;
