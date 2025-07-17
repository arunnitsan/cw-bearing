import { Dropdown } from "react-bootstrap";

const Select = ({ title, placeholder, options, handleSelect }) => {
  return (
    <div className="custom-input-group">
      <span>{placeholder}</span>
      <Dropdown onSelect={handleSelect}>
        <Dropdown.Toggle>{title}</Dropdown.Toggle>

        <Dropdown.Menu>
          {options.map((option, id) => (
            <Dropdown.Item key={option + id} as="span">
              {option}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default Select;
