import BookIcon from '../../../../assets/icon/BookIcon';
import PenIcon from '../../../../assets/icon/PenIcon';
import TrashIcon from '../../../../assets/icon/TrashIcon';
import { deleteData, getData } from '../../../../library/AxiosLib';
import { useStateGlobal } from '../../../../utils/GlobalState';
import { ServerURL } from '../../../../config/default.json';
import { DELETE_BOOK, GET_DATA, UPDATE_BOOK } from '../../../../utils/types';

export default function ListBook(props) {
  const [state, dispatch] = useStateGlobal();
  function handleClickUpdate(idGet) {
    dispatch({ type: UPDATE_BOOK, loading: true });
    if (props.forwardingRefUpdateToChild.current) {
      const [
        ,
        idEl,
        titleEl,
        isbnEl,
        authorEl,
        nameEl,
        countryEl,
        dateEl,
        availableEl,
      ] = props.forwardingRefUpdateToChild.current.childNodes[0].childNodes[0].childNodes;
      idEl.value = null;
      titleEl.value = null;
      isbnEl.value = null;
      authorEl.value = null;
      nameEl.value = null;
      availableEl.value = null;
      countryEl.value = null;
      dateEl.value = null;
      const stateBook = state.book.filter((e) => {
        return e._id === idGet;
      });
      const { author, available, isbn, publisher, title } = stateBook[0];
      const { country, name, date } = publisher;
      idEl.value = idGet;
      titleEl.value = title;
      isbnEl.value = isbn;
      authorEl.value = author;
      nameEl.value = name;
      availableEl.value = available;
      countryEl.value = country;
      dateEl.value = date;
      dispatch({ type: UPDATE_BOOK, loading: false });
      props.forwardingRefUpdateToChild.current.style.visibility = 'visible';
    }
  }

  function handleClickDelete(id) {
    if (window.confirm('Anda Yakin')) {
      dispatch({ type: DELETE_BOOK, loading: true });
      deleteData(`${ServerURL}/book/${id}`, localStorage.getItem('token')).then(
        () => {
          getData(`${ServerURL}/book`, localStorage.getItem('token')).then(
            (response) => {
              dispatch({
                type: GET_DATA,
                member: state.member,
                book: response.data.book,
                loading: false,
              });
            }
          );
        }
      );
    }
  }

  return (
    <div className='listBook'>
      <div>
        <div
          onClick={() => {
            handleClickDelete(props.id);
          }}>
          <button style={{backgroundColor:'red', color:'white', height:'35px', width:'70px'}} >hapus</button>
        </div>
        <div
          onClick={() => {
            handleClickUpdate(props.id, props.title);
          }}>
          <button style={{backgroundColor:'green', color:'white', height:'35px', width:'70px'}}>edit</button>
        </div>
      </div>
      <div>
        <span className='titileBook'>{props.title}</span>
        <div>
          <span className='authorBook'>{props.author}</span>
          <span className='publisherBook'>{props.publisher}</span>
        </div>
        <div>
          <span className='isbnBook'>{props.isbn}</span>
          <span className='availablebook'>{props.available}</span>
        </div>
      </div>
      
    </div>
  );
}
