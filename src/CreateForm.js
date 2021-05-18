import React, { useState } from "react";
import firebase, { storage } from "./firebase/firebase";

const CreateForm = (props) => {
  const [ date, setDate ] = useState('');

  const [ caption, setCaption ] = useState('');

  const [ image, setImage ] = useState(null);

  const [ url, setUrl ] = useState('');

  const [ error, setError ] = useState('');

  const dateChange = (e) => {
    setDate(e.target.value)
  }

  const captionChange = (e) => {
    setCaption(e.target.value)
  }

  const selectedImage = (e) => {
    setImage(e.target.files[0]);
  }

  const addImage = () => {
    const uploadTask = storage.ref(`stamps/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      snapshot => {},
      error => {
        console.log(error)
      },
      () => {
        storage
          .ref('stamps')
          .child(image.name)
          .getDownloadURL()
          .then(url => {
            setUrl(url)
            firebase.database().ref('stamps').push({
              date, url, caption
            });
            props.getStamps()
        });
      });
}

  const handleSubmit = (e) => {
    e.preventDefault();
    if(date.length === 0 || caption.length === 0) {
      setError('Please enter valid date and caption')
    } else {
      setDate('');
      setCaption('');
      setImage(null);
      setError('')
      addImage();
    }
  }

  return (
    <div className="form-div">
      <form onSubmit={handleSubmit} className="form">
      {error && <p>{error}</p>}
        <input type="text"
        value={date}
        onChange={dateChange}
        type="date"
        className="form-input"
        >
        </input>

        <input type="file" onChange={selectedImage} className="form-file-input"></input>

        <input type="text"
        value={caption}
        onChange={captionChange}
        placeholder="Caption"
        className="form-input"
        >
        </input>

        <button className="form-btn">Add +</button>
      </form>
    </div>
 );
};

export default CreateForm;
