

import React, { useEffect , useState } from "react";
import './App.css'
const synth = window.speechSynthesis;
const App = () => {

  const [advice, setAdvice] = useState("")
  const [dude, setDude] = useState("")
  const [autor, setAutor] = useState([])

  
  
  




    
      
      const fetchData = async (url) => {
        try {
          const response = await fetch(url);
          const json = await response.json();
          //console.log(json);
          setAdvice(json.content);
          setDude(json.author);
          setAutor(current => [{ "id": json._id , "author": json.author } , ...current]);
            // reference to correct api call ... later :)
          //https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API/Using_the_Web_Speech_API 
          var utterance1 = new SpeechSynthesisUtterance(json.content);
          synth.speak(utterance1);
        } catch (error) {
          console.log("error", error);
        }
      };
    useEffect(() => {
      var location = "https://api.quotable.io/random"
      fetchData(location);
    }, []);

    const getNewQuote = () => {
      synth.cancel();
      var location = "https://api.quotable.io/random"
      fetchData(location);
    };

    const reLoadQuote = (quoteId) => {
      synth.cancel();
      var index = autor.findIndex(obj => obj.id == quoteId)
      setAutor([
        ...autor.slice(0, index),
        ...autor.slice(index + 1, autor.length)
      ]);
      var location = "https://api.quotable.io/quotes/" + quoteId
      fetchData(location);
    };

    var renderedOutput = autor.map(item => <div className="recordCard">
        <button className="roboButton" onClick={() => reLoadQuote(item.id)}>
      <img 
      className="smallrobo"
      src= {'https://robohash.org/' + item.author }
      alt="new"
      />
      </button>
      
      <div className="authorname">{item.author + 'bot'}</div> 
      </div>
      )
    return (
      
    <div>
      <img className="backdrop" src='https://cdn.dribbble.com/users/119313/screenshots/1681630/machine3.gif'/>
    <center><div className="container"><div className="app">
      <img 
      className="robo"
      src= {'https://robohash.org/' + dude }
      alt="new"
      />
      </div>
      <div className="adv">
      <h3>{dude + 'bot'}</h3> 
      <p className="par">{advice}</p><br></br>
      
      </div>
    </div> </center>
    <center>
    <button className="button-49" onClick={getNewQuote}>More Wisdom!</button>
    </center>
    <center>
    <div className="recordBox">
    {renderedOutput}
    </div>
    </center>
    </div>)
};

export default App;