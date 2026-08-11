import { useState } from "react";
import "./UIComponents.css";
import { EyeIcon, EyeOffIcon } from "lucide-react";

export function Input({placeholder, type, onChange, variant="primary", label, icon: Icon , className=""}){
    return(
        <div className="inp-group">
            <label className="inp-label">{label}</label><br/>
            <div className="inp-wrapper">
                {Icon && <Icon className="inp-icon inp-icon-left"/>}
                <input 
                placeholder={placeholder}
                type={type} onChange={onChange} 
                className={`inp inp-${variant} ${className}`}
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