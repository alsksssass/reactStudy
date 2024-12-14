import styles from './Weather.module.css';
import WeatherElement from "./WeatherElement";

const HourlyWeather = ({ list }) => {
	return (<div>
			<h2>오늘 날씨</h2>
			<ul className={styles.weatherList}>
			{list && list.map((v, i) => <li key={i}>
				<WeatherElement
					title={(new Date(v.DateTime)).getHours() + '시'}
					iconNum={v.WeatherIcon}
					desc={v.IconPhrase}
					temparature={v.Temperature}
				/>
				</li>)}
			</ul>
		</div>);
}

export default HourlyWeather;
