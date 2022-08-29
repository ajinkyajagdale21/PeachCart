import React from "react";
import { useData } from "../dataContext";

export const Sidebar = () => {
  const {
    state: { sortBy, includeOutOfStock, fastDelivery, isRated, isPriced },
    dispatch,
  } = useData();
  const { toggleSidebar } = useData();
  return (
    <div className={`sidebar ${toggleSidebar ? "show" : "hide"}`}>
      <div>
        <button
          className="btn btn-light"
          onClick={() => dispatch({ type: "CLEAR_FILTERS" })}
        >
          CLEAR FILTERS{" "}
        </button>
      </div>
      <label className="labels">
        <input
          type="radio"
          name="sort"
          checked={sortBy && sortBy === "LOW_TO_HIGH"}
          onChange={() => dispatch({ type: "SORT", payload: "LOW_TO_HIGH" })}
        />{" "}
        Price :- LOW TO HIGH
      </label>
      <label className="labels">
        <input
          type="radio"
          name="sort"
          checked={sortBy && sortBy === "HIGH_TO_LOW"}
          onChange={() => dispatch({ type: "SORT", payload: "HIGH_TO_LOW" })}
        />{" "}
        Price :- HIGH TO LOW
      </label>
      <label className="labels">
        <input
          type="checkbox"
          checked={includeOutOfStock}
          onChange={() => dispatch({ type: "TOGGLE_INVENTORY" })}
        />{" "}
        Include Out Of Stock
      </label>
      <label className="labels">
        <input
          type="checkbox"
          checked={fastDelivery}
          onChange={() => dispatch({ type: "TOGGLE_DELIVERY" })}
        />{" "}
        FAST DELIVERY ONLY
      </label>
      <h4>RATINGS</h4>
      <label className="labels">
        <input
          type="checkbox"
          checked={isRated && isRated === 4}
          onChange={() => dispatch({ type: "RATED_DATA", payload: 4 })}
        />{" "}
        4 and ABOVE
      </label>
      <label className="labels">
        <input
          type="checkbox"
          checked={isRated && isRated === 3}
          onChange={() => dispatch({ type: "RATED_DATA", payload: 3 })}
        />{" "}
        3 and ABOVE
      </label>
      <label className="labels">
        <input
          type="checkbox"
          checked={isRated && isRated === 2}
          onChange={() => dispatch({ type: "RATED_DATA", payload: 2 })}
        />{" "}
        2 and ABOVE
      </label>
      <h4>PRICES</h4>
      <label className="labels">
        <input
          type="checkbox"
          checked={(isPriced && isPriced === 700) || false}
          onChange={() => dispatch({ type: "PRICE_FILTER", payload: 700 })}
        />{" "}
        700 and ABOVE
      </label>
      <label className="labels">
        <input
          type="checkbox"
          checked={(isPriced && isPriced === 600) || false}
          onChange={() => dispatch({ type: "PRICE_FILTER", payload: 600 })}
        />{" "}
        600 and ABOVE
      </label>
      <label className="labels">
        <input
          type="checkbox"
          checked={(isPriced && isPriced === 500) || false}
          onChange={() => dispatch({ type: "PRICE_FILTER", payload: 500 })}
        />{" "}
        500 and ABOVE
      </label>
      <label className="labels">
        <input
          type="checkbox"
          checked={(isPriced && isPriced === 400) || false}
          onChange={() => dispatch({ type: "PRICE_FILTER", payload: 400 })}
        />{" "}
        400 and ABOVE
      </label>
    </div>
  );
};
