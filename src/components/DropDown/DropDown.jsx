import { useState } from "react";
import capitalize from "../../utils/capitalize";
import { FaAngleLeft } from "react-icons/fa";
import "./DropDown.css";

export default function DropDown({
    className,
    options,
    onChange,
    defaultOption,
    limit,
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState(
        defaultOption ? defaultOption : ""
    );
    const type = typeof options[0];
    //   const [query, setQuery] = useState("");

    function handleClick() {
        setIsOpen((prev) => !prev);
    }

    function handleSelect(option) {
        setSelected(option);
        onChange(option);
        setIsOpen(false);
    }

    //   const filteredOptions = options.filter((option) =>
    //     option.option.toLowerCase().includes(query.toLowerCase())
    //   );

    const dropDownChoices = options.map((option, index) => {
        if (type === "string") {
            return (
                <div
                    key={`diff.${index}`}
                    className={`drop-down-choice${
                        selected === option ? " selected" : ""
                    }`}
                    onClick={() => handleSelect(option)}
                >
                    {capitalize(option)}
                </div>
            );
        } else if (type === "object") {
            return (
                <div
                    key={`diff.${index}`}
                    className={`drop-down-choice${
                        selected === option.value ? " selected" : ""
                    }`}
                    onClick={() => handleSelect(option.value)}
                >
                    {capitalize(option.option)}
                </div>
            );
        }
    });

    function getOptionFromValue(value) {
        const option = options.find((option) => option.value === value);
        return option.option;
    }

    return (
        <div className={"drop-down " + className}>
            <div className="drop-down-header" onClick={handleClick}>
                <div className="drop-down-selected">
                    {type === "string"
                        ? selected === ""
                            ? "---"
                            : capitalize(selected)
                        : !selected
                        ? "---"
                        : capitalize(getOptionFromValue(selected))}
                </div>
                <button
                    className={`drop-down-btn${isOpen ? " open" : ""}`}
                    type="button"
                >
                    <FaAngleLeft />
                </button>
            </div>
            {isOpen && (
                <div
                    className="drop-down-choices"
                    style={{ "--max-height": limit }}
                >
                    {dropDownChoices}
                </div>
            )}
        </div>
    );
}
