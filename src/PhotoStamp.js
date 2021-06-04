import React from 'react';
import firebase, { storage } from './firebase/firebase';
import DeleteIcon from '@material-ui/icons/Delete';

const PhotoStamp = (props) => {
  const deleteStamp = () => {
    const stampRef = firebase.database().ref('stamps').child(props.id);
    stampRef.remove();
    const imageRef = storage.refFromURL(props.image);
    imageRef.delete().then(() => {
      console.log('Deleted from storage')
    });
    props.handleDelete(props.id);
    }

  return (
    <div className="div">
    <div className="photo-stamp">
    <div key={props.id}>
    <p className="stamp-info">{props.date}</p>
    <img src={props.image} alt={props.index} className="image"/>
    <p className="stamp-info">{props.caption}</p>
    <button onClick={deleteStamp} className="delete-btn"><DeleteIcon/></button>
    </div>
    </div>
    </div>
  )
}

export default PhotoStamp;
