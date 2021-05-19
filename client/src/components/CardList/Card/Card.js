import {React} from 'react';
import { useHistory } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import LoadingContainer from '../../../utils/LoadingContainer/LoadingContainer';
import {
  deleteLicensePlate,
  setNotification,
} from '../../../actions/user_actions';
import './Card.css';

const Card = ({licensePlate, type, mode}) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const currentLoginUser = useSelector((state) => state.user_reducer.loggedInUser);
  
  const onCardSelect = () => {
    if (type === "licensePlate") {
      if (currentLoginUser === null || currentLoginUser === undefined) {
        dispatch(setNotification("Please login first!"));
      } else {
        history.push(`/user/licensePlate/${licensePlate.id}`);
      } 
    }
  }
  
  const onCardDelete = () => {
    if (type === "licensePlate") {
      dispatch(deleteLicensePlate(licensePlate.id));
    } 
  }

  return (
    <div className="card_detail shadow">
      <div className="title_bar shadow">
        { type === "licensePlate" ? licensePlate.title :  null }            
      </div>
      { 
        type === "licensePlate" 
        ? <div className="licensePlate_info">
            <div>Plate Number:&nbsp; <span>{licensePlate.title}</span></div>
            <div>Owner:&nbsp; <span>{licensePlate.owner}</span></div>
            <div>Origin:&nbsp; <span>{licensePlate.origin}</span></div>
          </div>
        : null   
      }
      {
        mode === "view"
        ? <>
            {
              type === "licensePlate" ? 
              <>
                <button type="button" className="card_button buy_button shadow" onClick={onCardSelect}>Detail</button>   
                <button type="button" className="card_button delete_button shadow" onClick={onCardDelete}>Delete</button>
              </>
              : null   
            } 
          </>
       : null
      }
      <div className="image_container">
        { type === "licensePlate" && licensePlate.imgUrl ? 
          (<img className="image" alt="Loading..." src={licensePlate.imgUrl}/>)
        : (<LoadingContainer style="spinner"/>)
        }
      </div>
    </div>
  );
    
};
export default Card;