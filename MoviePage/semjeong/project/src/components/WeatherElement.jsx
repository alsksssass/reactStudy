import PropTypes from "prop-types";

const WeatherElement = ({ title, iconNum, desc, temparature }) => {
  const getImgName = (iconNum) => {
		let numStr = iconNum + "";
		if (iconNum < 10) numStr = "0" + numStr;
		return `https://developer.accuweather.com/sites/default/files/${numStr}-s.png`
  };

  const getCelsius = (temp) => {
		if (temp.Unit !== 'F') return 'error';
		return Math.round((temp.Value - 32) * 5 * 10 / 9) / 10 + " C°";
	}
  
  return (<>
    <p>{title}</p>
    <img src={getImgName(iconNum)} alt={desc} />
    <p>{desc}</p>
    {temparature && <p>{getCelsius(temparature)}</p>}
  </>);
}

WeatherElement.propTypes = {
  title: PropTypes.string.isRequired,
  iconNum: PropTypes.number.isRequired,
  desc: PropTypes.string.isRequired,
  temparature: PropTypes.object,
}

export default WeatherElement;
