import styles from "./Filter.module.css";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "./../../redux/actions.js";

const OrderComp = () => {

    const dispatch = useDispatch();
    const temperamentList = useSelector(state => state.temperaments);

    const handleFilter = ({ target: { value, name } }) => {
        dispatch(actions.filterDogs(value, name));
    }

    return (
        <div className={styles.divSelect}>
            <label htmlFor="temperament"> Filter by: </label>
            <select onChange={handleFilter} className={styles.selectValue} name="temperament" id="temperament">
                <option value="All">All</option>
                {
                    temperamentList?.map((element, key) => {
                        return (
                            <option value={element} key={key}>{element}</option>
                        )
                    })
                }
            </select>
            <label htmlFor="origin"> Filter by: </label>
            <select onChange={handleFilter} className={styles.selectValue} id="origin" name="origin">
                <option value="All">All</option>
                <option value="api">API </option>
                <option value="db">Database </option>
            </select>
        </div>
    )
}

export default OrderComp;