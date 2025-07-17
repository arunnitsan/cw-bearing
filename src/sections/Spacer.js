const Spacer = ({ data }) => {
  return (
    <div className={`${data && data.spacer ? data.spacer : ""}`}></div>
  );
}

export default Spacer;