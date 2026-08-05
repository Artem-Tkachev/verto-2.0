import "./UIComponents.css";

export function Input({placeholder, type, onChange, variant}){
    return(
        <input placeholder={placeholder} type={type} onChange={onChange} className={'btn btn-${variant}'}/>
    );
}

export function LRForm(){
    return(
        <form ></form>
    )
} 