import { useState, useEffect } from "react";
import Dog from "../Dog/Dog";
import styles from "./Dogs.module.css";
import { useSelector, useDispatch } from "react-redux";
import NoDogs from "./../NoDogs/NoDogs";
import { setCurrentPage,updateDogs } from "./../../redux/actions";

const Dogs = () => {

  //Estados para manejar:
  // pagina actual
  // obteniendo los perros por variable globales:
  const { apiAllDogs, filteredDogs, errorInSearch, currentPage, needUpdate } = useSelector(state => state);
  const dogsToRender = filteredDogs.length > 0 ? filteredDogs : apiAllDogs;
  //////////////////////////////////////////////////////////////////////////////
  const dispatch = useDispatch();
  ///////////////////////////////perros por pagina//////////////////////////////
  const [cardsPerPage] = useState(8);
  //// variable para actualizar los perros

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const maxPages = Math.ceil(dogsToRender.length / cardsPerPage);

  const currentCards = dogsToRender.slice(indexOfFirstCard, indexOfLastCard);

  const renderPageNumer = () => {
    let pagesToReturn = [];

    for (let i = 0; i < maxPages; i++) {
      pagesToReturn.push(
        //<a onClick={()=>setCurrentPage(i+1)} className={styles.textPages} key={i}>{`${i+1}`}</a>
        <a onClick={() => dispatch(setCurrentPage(i + 1))} className={currentPage === (i + 1) ? styles.textPagesSelected : styles.textPages} key={i}>{`${i + 1}`}</a>
      );
    }
    return pagesToReturn;
  };

  useEffect(() => {
    if(needUpdate)
    dispatch(updateDogs());
  }, []);

  return (
    <div>
      <div className={styles.divPagination}>

        <button className={styles.button} type="button"
          onClick={() => {
            dispatch(setCurrentPage(currentPage - 1));
          }}
          disabled={currentPage === 1}
        >
          <div className={styles.buttonbox}>
            <span className={styles.buttonelem}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 46 40">
                <path d="M46 20.038c0-.7-.3-1.5-.8-2.1l-16-17c-1.1-1-3.2-1.4-4.4-.3-1.2 1.1-1.2 3.3 0 4.4l11.3 11.9H3c-1.7 0-3 1.3-3 3s1.3 3 3 3h33.1l-11.3 11.9c-1 1-1.2 3.3 0 4.4 1.2 1.1 3.3.8 4.4-.3l16-17c.5-.5.8-1.1.8-1.9z"></path>
              </svg>
            </span>
            <span className={styles.buttonelem}>
              <svg viewBox="0 0 46 40">
                <path d="M46 20.038c0-.7-.3-1.5-.8-2.1l-16-17c-1.1-1-3.2-1.4-4.4-.3-1.2 1.1-1.2 3.3 0 4.4l11.3 11.9H3c-1.7 0-3 1.3-3 3s1.3 3 3 3h33.1l-11.3 11.9c-1 1-1.2 3.3 0 4.4 1.2 1.1 3.3.8 4.4-.3l16-17c.5-.5.8-1.1.8-1.9z"></path>
              </svg>
            </span>
          </div>
        </button>

        {renderPageNumer()}

        <button className={styles.button} type="button"
          onClick={() => {
            dispatch(setCurrentPage(currentPage + 1));
          }}
          disabled={currentPage === Math.ceil(dogsToRender.length / cardsPerPage)}
        >
          <div className={styles.buttonbox}>
            <span className={styles.buttonelem}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 46 40">
                <path d="M0 20.038c0-.7.3-1.5.8-2.1l16-17c1.1-1 3.2-1.4 4.4-.3 1.2 1.1 1.2 3.3 0 4.4L9.1 19.038H42c1.7 0 3 1.3 3 3s-1.3 3-3 3H8.9l11.3 11.9c1 1 1.2 3.3 0 4.4-1.2 1.1-3.3.8-4.4-.3l-16-17c-.5-.5-.8-1.1-.8-1.9z"></path>
              </svg>
            </span>
            <span className={styles.buttonelem}>
              <svg viewBox="0 0 46 40">
                <path d="M0 20.038c0-.7.3-1.5.8-2.1l16-17c1.1-1 3.2-1.4 4.4-.3 1.2 1.1 1.2 3.3 0 4.4L9.1 19.038H42c1.7 0 3 1.3 3 3s-1.3 3-3 3H8.9l11.3 11.9c1 1 1.2 3.3 0 4.4-1.2 1.1-3.3.8-4.4-.3l-16-17c-.5-.5-.8-1.1-.8-1.9z"></path>
              </svg>
            </span>
          </div>
        </button>

      </div>
      <div className={styles.DogsContainer}>
        {!errorInSearch ? (currentCards.map((item) => {
          return (
            <div key={item.id}>
              <Dog props={item} />
            </div>
          );
        })) : <NoDogs />
        }
      </div>
      {/*
      props.map((item, key) => {
        return (
          <div key={key}>
            <Dog props={item} />
          </div>
        );
      })*/}
    </div>
  );
};

export default Dogs;


/*
<button className={styles.button} type="button"
          onClick={() => {
            dispatch(setCurrentPage(currentPage + 1));
          }}
          disabled={currentPage === Math.ceil(dogsToRender.length / cardsPerPage)}
        >
  <div className={styles.buttonbox}>
    <span className={styles.buttonelem}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 46 40">
        <path d="M0 20.038c0-.7.3-1.5.8-2.1l16-17c1.1-1 3.2-1.4 4.4-.3 1.2 1.1 1.2 3.3 0 4.4L9.1 19.038H42c1.7 0 3 1.3 3 3s-1.3 3-3 3H8.9l11.3 11.9c1 1 1.2 3.3 0 4.4-1.2 1.1-3.3.8-4.4-.3l-16-17c-.5-.5-.8-1.1-.8-1.9z"></path>
      </svg>
    </span>
    <span className={styles.buttonelem}>
      <svg viewBox="0 0 46 40">
       <path d="M0 20.038c0-.7.3-1.5.8-2.1l16-17c1.1-1 3.2-1.4 4.4-.3 1.2 1.1 1.2 3.3 0 4.4L9.1 19.038H42c1.7 0 3 1.3 3 3s-1.3 3-3 3H8.9l11.3 11.9c1 1 1.2 3.3 0 4.4-1.2 1.1-3.3.8-4.4-.3l-16-17c-.5-.5-.8-1.1-.8-1.9z"></path>
      </svg>
    </span>
  </div>
</button>


<button
          className={styles.buttonPagination}
          type="button"
          onClick={() => {
            dispatch(setCurrentPage(currentPage - 1));
          }}
          disabled={currentPage === 1}
        >
          Previous
        </button>


<button
          className={styles.buttonPagination}
          type="button"
          onClick={() => dispatch(setCurrentPage(currentPage + 1))}
          disabled={currentPage === Math.ceil(dogsToRender.length / cardsPerPage)}
        >
          Next
        </button>

*/