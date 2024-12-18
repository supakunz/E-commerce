/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
const FilterBox = ({ filters, updateFilters }) => {
  const onFilter = (event) => {
    const {
      target: { value, checked },
    } = event;

    /*
    updateFilters(
      filters.map((f) => {
        if (f.label === value) {
          return {
            ...f,
            isChecked: checked
          };
        }
        return f;
      })
    );
    */
    updateFilters(
      filters.map((f) => {
        return {
          ...f,
          isChecked: value === "all" ? true : f.label === value,
        };
      })
    );
  };

  return (
    <div className="filter-box">
      {filters.map((f) => (
        <div className="filter-box-item" key={`${f.label}_key`}>
          <input
            id={f.label}
            type="checkbox"
            value={f.label}
            onChange={onFilter}
            checked={f.isChecked}
          />
          <label htmlFor={f.label}>{f.label}</label>
        </div>
      ))}
    </div>
  );
};
export default FilterBox;
