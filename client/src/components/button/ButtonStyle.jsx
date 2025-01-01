/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import "./style.css";

const ButtonStyle = ({ type }) => {
  return (
    <div className="btn">
      <button
        className={`rounded-lg flex justify-center ${
          type == "Login"
            ? "bg-black"
            : type == "Admin"
            ? "bg-[#8793e2]"
            : "bg-red-500"
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
