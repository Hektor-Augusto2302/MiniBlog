import './InputDarkMode.css';

const InputDarkMode = ({ darkMode, toggleDarkMode }) => {
    return (
        <label className="switch switch-dark d-flex align-items-center">
            <input checked={darkMode} type="checkbox" onChange={toggleDarkMode} />
            <span className="slider dark-mode-input">
                {darkMode ? (
                    <i className="bi bi-moon-stars moon-icon"></i>
                ) : (
                    <i className="bi bi-brightness-high-fill sun-icon"></i>
                )}
            </span>
        </label>
    )
}

export default InputDarkMode;
