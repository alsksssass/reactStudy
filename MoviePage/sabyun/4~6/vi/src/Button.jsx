import PropType from "prop-types";
import styled from "./Button.module.css";

export function Button ({txt,fn}){
	return <button className={styled.btn} onClick={fn}>{txt}</button>;
}

Button.ProtoType = {
	txt : PropType.string.isRequired,
};

export default Button;