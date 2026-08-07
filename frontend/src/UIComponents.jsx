import "./UIComponents.css";

export function Input({placeholder, type, onChange, variant="primary", label}){
    return(
        <div>
            <label>{label}</label>
            <input placeholder={placeholder} type={type} onChange={onChange} className={`inp inp-${variant}`}/>
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