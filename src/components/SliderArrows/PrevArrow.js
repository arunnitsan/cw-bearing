const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <button
      className={className}
      style={{ ...style, display: "flex", alignItems: "center" }}
      onClick={onClick}
    >
      <img src="/images/png/arrowhead-left-blue.svg" alt="Arrow" />
      <img
        src="/images/png/arrowhead-left-lightblue.svg"
        alt="Arrow"
        className="hover-visible"
      />
    </button>
  );
};

export default PrevArrow;
