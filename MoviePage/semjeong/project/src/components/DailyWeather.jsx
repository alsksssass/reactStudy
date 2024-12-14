import styles from './Weather.module.css';
import WeatherElement from "./WeatherElement";

const DailyWeather = ({ list }) => {
	console.log(list);
	return (<div>
		<h2>5일 날씨</h2>
		<ul className={styles.weatherList}>
			{list && list.map((v, i) => 
				<li key={i}>
					<p>{ (new Date(v.Date)).toDateString() }</p>
					<WeatherElement
						title="낮"
						iconNum={v.Day.Icon}
						desc={v.Day.IconPhrase}
					/>
					<WeatherElement
						title="밤"
						iconNum={v.Night.Icon}
						desc={v.Night.IconPhrase}
					/>
				</li>
			) }
		</ul>
	</div>);
}

export default DailyWeather;
