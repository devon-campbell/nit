import React, {useState, useEffect} from 'react';

function App() {
  const [data, setData] = useState([{}]);

  useEffect(() => {
    fetch("/dogs").then(
      response => response.json()
    ).then(
      data => {
        setData(data);
        console.log(data);
      }
    ).catch(
      error => {
        console.log(error);
      }
    )
  }, []);

  return (
    <div>
        {(typeof data.dogs === 'undefined') ? (
          <p>Loading... </p>
        ) : (
          data.dogs.map((dog, index) => (
            <p key={index}>{dog}</p>
          ))
        )
        }
    </div>
  );
}

export default App;
