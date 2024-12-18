/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import "./style.css";

const ButtonStyle = ({ type }) => {
  return (
    <div className="btn">
      <button
        className={`rounded-full flex justify-center ${
          type == "Login" ? "bg-black" : "bg-red-500"
        }`}
      >
        {type}
        <div className="arrow-wrapper">
          <div className="arrow"></div>
        </div>
      </button>
    </div>
  );
};

export default ButtonStyle;
