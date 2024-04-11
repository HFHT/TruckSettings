import { useState } from "react";
// import './select.css';

interface ISelect {
    value: string | number;
    setter: Function;
    title: string;
    classes?: string;
    defaultValue?: string;
    autoFocus?: boolean;
    disabled?: boolean;
    required?: boolean;
    size?: number;
    children?: React.ReactNode;
}

export function Select({ value, setter, title, classes, defaultValue, autoFocus = false, disabled = false, required = false, size = 0, children }: ISelect) {
    const [theValue, setTheValue] = useState(value)
    const handleChange = (e: any) => {
        setTheValue(e);
        setter(e);
    }
    return (
        <>
            <div className="selectdiv">
                <label className="">
                    <span className="text-sm">
                        {title + (required ? ' *' : '')}
                    </span>
                    <select
                        id={title}
                        value={theValue}
                        defaultValue={defaultValue}
                        disabled={disabled} autoFocus={autoFocus} required={required} size={size}
                        onChange={(e) => handleChange(e.target.value)}
                        onBlur={(e) => handleChange(e.target.value)}
                        title={title}
                        aria-label={title}
                        className="">
                        {children}
                    </select>
                </label>
            </div>
        </>
    )
}