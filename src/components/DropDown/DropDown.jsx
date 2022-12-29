import { useState, useRef, useEffect } from "react";
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
    const [query, setQuery] = useState("");
    const type = typeof options[0];

    const selectedRef = useRef(null);

    useEffect(() => {
        if (selectedRef.current) {
            selectedRef.current.scrollIntoView({
                block: "center",
            });
        }
    }, [isOpen]);

    function handleClick() {
        setIsOpen((prev) => !prev);
    }

    function handleSelect(option) {
        setSelected(option);
        onChange(option);
        setIsOpen(false);
    }

    const filteredOptions = options.filter((option) =>
        option.option.toLowerCase().includes(query.toLowerCase())
    );

    const dropDownChoices = filteredOptions.map((option, index) => {
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
                    ref={selected === option.value ? selectedRef : null}
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

    const selectedOption =
        type === "string"
            ? selected === ""
                ? "---"
                : capitalize(selected)
            : !selected
            ? "---"
            : capitalize(getOptionFromValue(selected));

    return (
        <div className={"drop-down " + className}>
            <div className="drop-down-header">
                {isOpen ? (
                    <input
                        type="text"
                        className="drop-down-search"
                        placeholder={selectedOption}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        autoFocus
                    />
                ) : (
                    <div className="drop-down-selected" onClick={handleClick}>
                        {selectedOption}
                    </div>
                )}
                <button
                    className={`drop-down-btn${isOpen ? " open" : ""}`}
                    type="button"
                    onClick={handleClick}
                >
                    <FaAngleLeft />
                </button>
            </div>
            <div
                className={`drop-down-choices ${isOpen ? "shown" : "hidden"}`}
                style={{
                    "--max-height": limit,
                }}
            >
                {dropDownChoices}
            </div>
        </div>
    );
}
