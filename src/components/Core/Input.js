const Input = ({ error, legend, name, value, placeholder, handleChange }) => {
  const isplaceholder = placeholder ? placeholder : "";

  return (
    <div className="custom-input-group">
      <div className="custom-input-root">
        <span className="s-label">{legend}</span>
        <div className="custom-input-focused">
          <input
            name={name}
            type="text"
            placeholder={isplaceholder}
            value={value}
            onChange={handleChange}
          />
          <fieldset>
            <legend>
              <span>{legend}</span>
            </legend>
          </fieldset>
        </div>
      </div>
      {error && <div className="input-feedback">{error}</div>}
    </div>
  );
};

export default Input;
