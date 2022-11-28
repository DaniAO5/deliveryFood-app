import React from "react"
import { useDispatch } from "react-redux";
import { actionFilterRestoAsync, actionGetRestoAsync } from "../redux/actions/restoActions";
import { category } from "../services/dates";
import "./style.scss";

const FilterButtons = () => {
  const dispatch = useDispatch();
  const onFiltered = (searchValue) => {
    const searchParam = "category";
    dispatch(actionFilterRestoAsync(searchParam, searchValue));
  };
 
  return (
    <div className='containerHome_btn'>
      {/* <button
      type="button" class="btn btn-outline-warning"
        onClick={() => {
          dispatch(actionGetRestoAsync());
        }}
      >
        All
      </button> */}
     
      {category.map((item) => (
        <button
          key={item.value}
          type="button" class="btn btn-outline-warning"
          onClick={() => {
            onFiltered(item.label);
          }}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default FilterButtons;
