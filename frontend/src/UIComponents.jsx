import { useState } from "react";
import "./UIComponents.css";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Link, NavLink } from "react-router";

export function Input({placeholder, type="none", onChange, variant="primary", label, icon: Icon , className="", value}){
    return(
        <div className={`inp-group inp-group-${variant}`}>
            <label className="inp-label">{label}</label><br/>
            <div className="inp-wrapper">
                {Icon && <Icon className={`inp-icon inp-icon-left inp-icon-${variant}`}/>}
                <input 
                placeholder={placeholder}
                type={type} onChange={onChange} 
                className={`inp inp-${variant} ${className}`}
                value={value}
                />
            </div>
        </div>
    );
}

export function PasswordInput({placeholder, type, onChange, variant="primary", label, icon: Icon , className=""}){
    const [visible, setvisible] = useState(false);
    return(
        <div className="inp-group">
            <label className="inp-label">{label}</label><br/>
            <div className="inp-wrapper">
                {Icon && <Icon className="inp-icon inp-icon-left"/>}
                <input 
                placeholder={placeholder}
                type={visible ? "text" : "password"} onChange={onChange} 
                className={`inp inp-${variant} ${className}`}
                autoComplete="new-password"
                />
                <button type="button" className="inp-icon inp-icon-right" onClick={() => setvisible(v => !v)}>
                    {visible ? <EyeOffIcon/> : <EyeIcon/>}
                </button>
                
            </div>
        </div>
    );
}

export function Button({variant ="primary", text, Class="", type="submit"}){
    return(
        <button className={`btn btn-${variant} ${Class}`} type={type}>
            {text}
        </button>
    )
}

export function ButtonIcon({variant ="primary", text, Class="", type="submit", icon:Icon}){
    return(
        <div className="btn-wrapper">
            {Icon && <Icon className="inp-icon inp-icon-left"/>}
            <button className={`btn btn-${variant} ${Class}`} type={type}>{text}</button>
        </div>
    )
}

export function Li({text, icon: Icon, link, end = false}){
    return(
        <div className="Li-wrap">
            <li className="li-link-wrap"><NavLink to={link} className={({isActive}) => isActive ? "li-nav-active li-link" : "li-nav li-link"} end={end}>
                {({isActive}) =>(
                    <>
                        {Icon && <Icon className={isActive ? "li-icon-active" : "li-icon"}/>}
                        {text}
                    </>
                )}
            </NavLink></li>
        </div>
    )
}

const colors = ["#0364FF", "#16A34A", "#D97706", "#DC2626", "#7C3AED"];

function getColor(username) {
    const index = username.charCodeAt(0) % colors.length;
    return colors[index];
}

export function InitialsAvatar({ username, variant = "primary" }) {
    if (!username) {
        return <div className={`initials-avatar initials-avatar-default initials-avatar-${variant}`}>?</div>;
    }

    const initials = username.charAt(0).toUpperCase();
    const color = getColor(username);

    return (
        <div className={`initials-avatar initials-avatar-${variant}`} style={{ backgroundColor: color }}>
            {initials}
        </div>
    );
}