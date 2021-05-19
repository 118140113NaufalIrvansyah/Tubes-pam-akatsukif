import PenIcon from '../../../../assets/icon/PenIcon';
import TrashIcon from '../../../../assets/icon/TrashIcon';
import IdCardIcon from '../../../../assets/icon/IdCardIcon';
import { deleteData, getData } from '../../../../library/AxiosLib';
import { useStateGlobal } from '../../../../utils/GlobalState';
import { ServerURL } from '../../../../config/default.json';
import {
  GET_DATA,
  DELETE_MEMBER,
  UPDATE_MEMBER,
} from '../../../../utils/types';
import VeritifyUser from '../../../../assets/icon/VeritifyUser';

export default function ListMember(props) {
  const [state, dispatch] = useStateGlobal();

  function handleClickUpdate(idGet) {
    dispatch({ type: UPDATE_MEMBER, loading: true });
    if (props.forwardingRefUpdateBookToChild.current) {
      const [
        ,
        idEl,
        nameEl,
        emailEl,
        phoneEl,
      ] = props.forwardingRefUpdateBookToChild.current.childNodes[0].childNodes[0].childNodes;
      idEl.value = null;
      nameEl.value = null;
      emailEl.value = null;
      phoneEl.value = null;
      const stateMember = state.member.filter((e) => {
        return e._id === idGet;
      });
      const { name, email, phone } = stateMember[0];
      idEl.value = idGet;
      nameEl.value = name;
      emailEl.value = email;
      phoneEl.value = phone;
      dispatch({ type: UPDATE_MEMBER, loading: false });
      props.forwardingRefUpdateBookToChild.current.style.visibility = 'visible';
    }
  }

  function handleClickDelete(id) {
    if (window.confirm('Anda Yakin')) {
      dispatch({ type: DELETE_MEMBER, loading: true });
      deleteData(
        `${ServerURL}/member/${id}`,
        localStorage.getItem('token')
      ).then(() => {
        getData(`${ServerURL}/member`, localStorage.getItem('token')).then(
          (response) => {
            dispatch({
              type: GET_DATA,
              book: state.book,
              member: response.data.member,
              loading: false,
            });
          }
        );
      });
    }
  }

  return (
    <div className='listMember'>
      <div>
        <div
          onClick={() => {
            handleClickDelete(props.id);
          }}>
          <button style={{backgroundColor:'red', color:'white', height:'35px', width:'70px'}} >hapus</button>
        </div>
        
        <div
          onClick={() => {
            handleClickUpdate(props.id);
          }}>
          <button style={{backgroundColor:'green', color:'white', height:'35px', width:'70px'}}>edit</button>
        </div>
      </div>
      <div>
        <VeritifyUser height='70px' width='70px' color='#5a32a3' />
        <div>
          <span>{props.name}</span>
          <span>{props.email}</span>
          <span>{props.phone}</span>
          <span>{props.borrowedBooks.books.length}</span>
        </div>
      </div>
      <IdCardIcon height='200px' width='200px' color='#e1e4e8' />
    </div>
  );
}
