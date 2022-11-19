import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {
  
  const [listOfPosts, setListOfPosts] = useState([]);

  useEffect(() => {
    axios.get("http://192.168.1.50:3001/posts").then((response)=>{
      setListOfPosts(response.data)
    })
  }, [])
  
  return (
    
    <div className="App">
      {listOfPosts.map((value, key) => {
        return <div className='post'>
          <div className='title'>{value.title}</div>
          <div className='text'>{value.postText}</div>
          <div className='user'>{value.username}</div>
          </div>
      })}
    </div>
  );
}

export default App;
