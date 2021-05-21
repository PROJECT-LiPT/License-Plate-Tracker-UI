import {React, useState, useRef} from 'react';
import { useHistory } from 'react-router-dom';
import FileBase from 'react-file-base64';
import {useDispatch, useSelector} from 'react-redux';
import LoadingContainer from '../../../utils/LoadingContainer/LoadingContainer';
import {
  deleteLicensePlate,
  setNotification,
  deleteUser,
  updateUser
} from '../../../actions/user_actions';
import './Card.css';

const Card = ({licensePlate, user, type, mode}) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [currentImg, setCurrentImg] = useState(null);
  const currentLoginUser = useSelector((state) => state.user_reducer.loggedInUser);
      
  const userInputRef = 
    {
      userName: useRef(null),
      fullName: useRef(null),
      email: useRef(null),
      passWord: useRef(null),
      address: useRef(null),
      gender: useRef(null),
      phoneNumber: useRef(null),
      birthDate: useRef(null)
    };
    


  const onCardSelect = () => {
    if (type === "licensePlate") {
      if (currentLoginUser === null || currentLoginUser === undefined) {
        dispatch(setNotification("Please login first!"));
      } else {
        if (currentLoginUser.isUser) {
          history.push(`/user/gallery/${licensePlate.id}`);
        } else if (currentLoginUser.isAdmin) {
          history.push(`/admin/gallery/${licensePlate.id}`);
        }
      } 
    }
  }
  
  const onCardDelete = () => {
    if (type === "licensePlate") {
      dispatch(deleteLicensePlate(licensePlate.id));
    } else if (type === "user") {
      dispatch(deleteUser(user.userName));
    }
  }

  const onCardUpdate = () => {
    if (type === "user") {
      const updatedUser = {
        userName:  userInputRef.userName.current.value || user.userName,
        fullName: userInputRef.fullName.current.value ,
            imgUrl:  currentImg ? currentImg : user.imgUrl,
            email:  userInputRef.email.current.value ,
            passWord: userInputRef.passWord.current.value ,
            gender: userInputRef.gender.current.value ,
            address: userInputRef.address.current.value ,
            phoneNumber: userInputRef.phoneNumber.current.value ,
            birthDate: userInputRef.birthDate.current.value
      };
      dispatch(updateUser(user.userName, updatedUser))
      .then(() => setIsEditing(false));
    }
  }

  const onCardEdit = () => {
      setIsEditing(true);
  }

  const onCardCancel = () => {
    setIsEditing(false);
  }

  if (type === "user") {

    return (
      <div className="card_detail shadow">
        <div className="title_bar shadow">
          <span>{user.userName}</span>
        </div>
        <div className="licensePlate_info">
          <div> Username: &nbsp;
                    { isEditing === false ? <span>{user.userName}</span>
                      : (<input ref={userInputRef.userName} autoFocus={true} type="text" defaultValue={user.userName}></input>)
                    }
            </div>
            <div> Password: &nbsp;
                    { isEditing === false ? <span>********</span>
                    : (<input ref={userInputRef.passWord} type="password"  required maxLength={12} defaultValue={user?.passWord}></input>)
                    }
                </div>
                <div> Full Name: &nbsp;
                        { isEditing === false ? <span>{user?.fullName}</span>
                        : (<input ref={userInputRef.fullName} type="text" required defaultValue={user?.fullName}></input>)
                        }
                </div>
                <div> <span>Mobile: &nbsp;</span>
                        { isEditing === false ? <span>{user?.phoneNumber}</span>
                        : (<input ref={userInputRef.phoneNumber} type="text" required defaultValue={user?.phoneNumber}></input>)
                        }
                </div>
                <div> Birth Date: &nbsp;
                        { isEditing === false ? <span>{user?.birthDate}</span>
                        : (<input ref={userInputRef.birthDate} type="date" required defaultValue={user?.birthDate}></input>)
                        }
                </div>
                <div> Address: &nbsp;
                        { isEditing === false ? <span>{user?.address}</span>
                        : (<input ref={userInputRef.address} type="text" required defaultValue={user?.address}></input>)
                        }
                </div>
                <div> Email: &nbsp;
                        { isEditing === false ? <span>{user?.email}</span>
                        : (<input ref={userInputRef.email} type="text"  required pattern="[A-Za-z0-9]+@gmail.com" defaultValue={user?.email}></input>)
                        }
                </div>
                <div> Gender: &nbsp;
                        { isEditing === false ? <span>{user?.gender}</span>
                        : 
                        (<select ref={userInputRef.gender} type="select" required defaultValue={user?.gender}>
                            <option value={"Male"}>Male</option>
                            <option value={"Female"}>Female</option>
                        </select>)
                        }
                </div>
        </div>
        <div className="image_container">
          { user.imgUrl || currentImg ? 
            <img className="image" src={currentImg || user.imgUrl}/>
           : <LoadingContainer/>
          }
        </div>
        <>
              { isEditing === false 
                ? (<button type="button" className="card_button edit_button shadow" onClick={onCardEdit}>
                    Edit
                  </button>) 
                : <>
                  
                  <button type="button" className="card_button cancel_button shadow" onClick={onCardCancel}>
                    Cancel
                  </button>
                  <button type="button" className="card_button base64_button">
                    Image Upload:
                    <FileBase className="base64"  type="file" multiple={false} onDone = {({base64}) => {setCurrentImg(base64)}}></FileBase>  
                  </button>
                  <button type="button" className="card_button save_button shadow" onClick={onCardUpdate}>
                    Save  
                  </button>
                  </>
              }
              <button type="button" className="card_button delete_button shadow" onClick={onCardDelete}>
                Delete   
              </button>
        </> 
      </div>
    );

  } else {

    return (
      <div className="card_detail shadow">
        <div className="title_bar shadow">
          { type === "licensePlate" ? licensePlate.title :  null }            
        </div>
        { 
          type === "licensePlate" 
          ? <div className="licensePlate_info">
              <div>Plate Number:&nbsp; <span>{licensePlate.title}</span></div>
              <div>Uploader:&nbsp; <span>{licensePlate.uploader}</span></div>
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
                  <button type="button" className="card_button select_button shadow" onClick={onCardSelect}>Detail</button>   
                </>
                : null   
              }
            </> 
          : mode ==="edit" ?
          <>
            <button type="button" className="card_button select_button shadow" onClick={onCardSelect}>Detail</button>   
            <button type="button" className="card_button delete_button shadow" onClick={onCardDelete}>Delete</button>
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
  }
    
};
export default Card;