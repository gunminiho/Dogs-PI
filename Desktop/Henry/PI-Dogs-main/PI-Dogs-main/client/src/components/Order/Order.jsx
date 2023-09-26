import styles from "./Order.module.css";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "./../../redux/actions.js";

const OrderComp = () => {

  const dispatch = useDispatch();

  const handleOrder = ({target:{value}}) => {
    dispatch(actions.orderDogs(value));
  }


  return (
    <div className={styles.divSelect}>
      <label htmlFor="AD"> Order by: </label>
      <select onChange={handleOrder} defaultValue="none" className={styles.selectValue} id="AD">
        <option value="none">None </option>
        <option value="weight">Weight </option>
        <option value="breed">Breed/Name </option>
        <option value="asc">id : Ascendent </option>
        <option value="des">id : Descendent </option>

      </select>
    </div>
  );
};

export default OrderComp;
