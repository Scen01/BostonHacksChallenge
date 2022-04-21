import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios'

function App() {
  const [getMessage, setGetMessage] = useState({})
  const [input, setInput] = useState('')
  const [list, setList] = useState([])

  useEffect(() => {
    axios.get('http://localhost:5000/hello').then(response => {
      console.log("SUCCESS", response)
      setGetMessage(response)
    }).catch(error => {
      console.log(error)
    })

  }, [])

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    console.log(input)
    // Make an array equal to what is already listed
    const to_input = list
    // Add input to array
    to_input.push(input)
    // set List to array
    setList(to_input)
    // Clear input
    setInput('')
    console.log(list)

    axios.post('http://localhost:5000/update', { 'Todos': list }).then(res => {
      console.log(res);
    })
  };

  const handleDelete = (toDelete) => {
    console.log(toDelete)
    var to_input = list
    var index = to_input.indexOf(toDelete);
    to_input.splice(index, 1);
    console.log(to_input)
    setList(to_input)
    console.log(list)
  };


  return (
    <div className="App">
      <input type='text' placeholder='Add a Todo' value={input}
        name='text' onChange={handleChange} />
      <button onClick={handleSubmit}>Add Todo</button>
      <p>
        {list.map(value => {
          return (
            <div>
              <button onClick={() => handleDelete(value)} >
                {value}
              </button>
            </div>
          )
        })}
      </p>

    </div>

  )
  // return (
  //   <div className="App">
  //     <div>{getMessage.status === 200 ? 
  //       <h3>{getMessage.data.message}</h3>
  //       :
  //       <h3>LOADING</h3>}
  //     </div>
  //   </div>
  // );
}

export default App;