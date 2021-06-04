import React, { useState, useEffect } from 'react';
import Header from './Header';
import CreateForm from './CreateForm';
import PhotoStamp from './PhotoStamp';
import Footer from './Footer';
import Loading from './Loading';
import firebase from './firebase/firebase';

const App = (props) => {
  const [ stamps, setStamps ] = useState([]);
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 4000)
  },[])

  const getStamps = () => {
    firebase.database().ref('stamps').on('value', (snapshot) => {
    const stampArray = [];
      snapshot.forEach((child) => {
        stampArray.push({
          id: child.key,
          ...child.val()
        });
      })
      setStamps(stampArray);
      console.log('Stamps', stamps);
    }, (e) => {
      console.log('Error', e);
    })
  }

  const handleDelete = (id) => {
    setStamps(stamps.filter((stamp) => stamp.id !== id));
  }


  useEffect(() => {
    getStamps()
  }, []);

  return (
    <div className="app-div">
      <Header />
      <CreateForm getStamps={getStamps} />
      {loading === false ?
        stamps && stamps.map((stamp, index) => (
          <PhotoStamp
          key={index}
          id={stamp.id}
          date={stamp.date}
          image={stamp.url}
          caption={stamp.caption}
          handleDelete={handleDelete}
          />
        )) : <Loading />
      }

      <Footer />
    </div>
  );
}

export default App;

// {stamps && stamps.map((stamp) => (
//   <div key={stamp.id}>
//     <p>{stamp.date}</p>
//     <img src={stamp.url} alt={stamp.id} />
//     <p>{stamp.caption}</p>
//     <button>Remove</button>
//   </div>
// ))}
