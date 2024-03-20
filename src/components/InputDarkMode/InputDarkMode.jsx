import './InputDarkMode.css';

const InputDarkMode = ({ darkMode, toggleDarkMode }) => {
    return (
        <label htmlFor="theme" className="theme">
            <span className="theme__toggle-wrap">
                <input id="theme" className="theme__toggle visually-hidden" type="checkbox" role="switch" name="theme" value="dark" defaultChecked={darkMode}/>
                    <span className={`theme__fill`}></span>
                    <span className={`theme__icon ${darkMode ? 'theme__icon-light' : 'theme__icon-dark'}`} onClick={toggleDarkMode}></span>
            </span>
        </label>
    )
}

export default InputDarkMode;
