const API_URL = 'http://dataservice.accuweather.com';
const API_GEOPOS_PATH = '/locations/v1/cities/geoposition/search';
const API_FORECAST_PATH = '/forecasts/v1/';
const API_KEY = import.meta.env.VITE_ACCUWEATHER_APIKEY;

const getAccuweatherAPI = async (path, queries = {}) => {
	const res = await fetch(`${API_URL}${path}?apikey=${API_KEY}` + queries.entries().map(v => `${v[0]}=${v[1]}`).join('&'));
	if (res.status !== 200) {
		console.log('error: cannot fetch =', res);
		throw new Error('fetch error');
	}
	const json = await res.json();
	console.log('json:', json);
	return json;
}

const getLocation = async (lat, lon) => {
	return await getAccuweatherAPI(API_GEOPOS_PATH, {q: `${lat},${lon}`});
}
const get12HourWeather = async (locKey) => {
	return await getAccuweatherAPI(`${API_FORECAST_PATH}hourly/12hour/${locKey}`);
}
const get5DayWeather = async (locKey) => {
	return await getAccuweatherAPI(`${API_FORECAST_PATH}daily/5day/${locKey}`);
}

export {getLocation, get12HourWeather, get5DayWeather};
