import { useState } from "react";
import "./InputNumber.css";

export default function InputNumber({
    className,
    onChange,
    defaultValue,
    max = 100,
    min = 0,
    step = 1,
}) {
    const [number, setNumber] = useState(defaultValue ? defaultValue : 10);

    function increment() {
        if (number + step <= max) {
            setNumber((prev) => prev + step);
            onChange(number + step);
        } else if (number + step > max) {
            setNumber(max);
            onChange(max);
        }
    }

    function decrement() {
        if (number - step >= min) {
            setNumber((prev) => prev - step);
            onChange(number - step);
        } else if (number - step < min) {
            setNumber(min);
            onChange(min);
        }
    }

    function handleChange(e) {
        const value = e.target.value;
        if (value === "") {
            setNumber("");
            onChange("");
            return;
        }
        const numberVal = parseInt(value);
        if (numberVal === NaN) {
            return;
        }
        if (numberVal >= min && numberVal <= max) {
            setNumber(numberVal);
            onChange(numberVal);
        }
    }

    return (
        <div className={`input-number ${className}`}>
            <button
                type="button"
                className="input-number-btn"
                onClick={decrement}
                aria-label="decrement"
            >
                -
            </button>
            <input
                type="text"
                id="input-number"
                onChange={handleChange}
                value={number}
            />
            <button
                type="button"
                className="input-number-btn"
                onClick={increment}
                aria-label="increment"
            >
                +
            </button>
        </div>
    );
}
