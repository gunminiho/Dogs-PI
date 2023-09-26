import React from "react";
import SearchBar from "../SearchBar/SearchBar";
import OrderComp from "../Order/Order";
import styles from "./NavBar.module.css";
import Filter from "../Filter/Filter";
import { Link } from "react-router-dom";

const NavBar = () => {

  return (
    <div className={styles.divNavBarr}>
      <div className={styles.divNavBarr2}>
        <Filter />
        <OrderComp />
        <Link to={`/add`}><button onClick={() => {}} className={styles.button} type="button">
          <span className={styles.button__text}>Add Dog</span>
          <span className={styles.button__icon}>
            <svg
              className="svg"
              fill="none"
              height="25"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="25"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line x1="12" x2="12" y1="5" y2="19"></line>
              <line x1="5" x2="19" y1="12" y2="12"></line>
            </svg>
          </span>
        </button></Link>
        <SearchBar />
      </div>
    </div>
  );
};

export default NavBar;

/*
<div className={styles.divNavBarr2}>
</div>
*/