import React from 'react';
import './App.css';

function App() {
  const [word, setWord] = React.useState('software');
  const [associations, setAssociations] = React.useState(null);
  const getAssociations = () => {
    fetch('/api/associations/' + word)
    .then(result => result.json())
    .then(body => setAssociations(body))
    .catch(error => console.log(error))
  };

  return (
    <div className="app">
      <h1>Word Associations!</h1>
      <input value={word} onChange={e => setWord(e.target.value)} />
      <button onClick={getAssociations}>Search</button>

      {associations && (
        associations.length === 0
          ? <p>No results</p>
          : <div>
             <p>Results! length = {associations.length}</p>
             {associations.map((association,index) => (
              <span key={index} style={{ fontSize: Math.pow(association.weight, 2) / 100 }}>
                {association.item}
                {' '}
              </span>
            ))}
          </div>
      )}
    </div>
  );
}

export default App;
