const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <button
      className={className}
      style={{ ...style, display: "flex", alignItems: "center" }}
      onClick={onClick}
    >
      <img src="/images/png/arrowhead-right-blue.svg" alt="Arrow" />
      <img
        src="/images/png/arrowhead-right-lightblue.svg"
        alt="Arrow"
        className="hover-visible"
      />
    </button>
  );
};

export default NextArrow;
