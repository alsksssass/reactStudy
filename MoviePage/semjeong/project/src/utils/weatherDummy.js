const getLocation = async () => {
	const res = await fetch('../../geolocation_data.json');
	const json = await res.json();
	console.log(json);
	return json;
}
const get12HourWeather = async (locKey) => {
	const json = await (await fetch('../../12hour_data.json')).json();
	console.log(json);
	return json;
}
const get5DayWeather = async (locKey) => {
	const json = await (await fetch('../../5days_data.json')).json();
	console.log(json);
	return json;
}

export {getLocation, get12HourWeather, get5DayWeather};
