const Textarea = ({
  error,
  legend,
  name,
  value,
  placeholder,
  handleChange,
}) => {
  const isplaceholder = placeholder ? placeholder : "";
  return (
    <div className="custom-input-group">
      <div className="custom-input-root">
        <span className="s-label">{legend}</span>
        <div className="custom-input-focused">
          <textarea
            name={name}
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
      <div className="input-feedback">{error}</div>
    </div>
  );
};

export default Textarea;
