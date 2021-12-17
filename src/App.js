// import logo from './logo.svg';
import './App.css';
var $ = require( "jquery" );

var React = require("react");
var Redux = require("redux");
var ReactRedux = require("react-redux");
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

//js jquery

function hsb(hue, sat, bri, alp = 1){ 
  var l;
  var s;
  
  if (bri === 0){
   return "hsla(0, 0%, 0%, "+alp+")"; 
  }  
  else {
     l = (bri/2) * (2 - (sat/100));
     s =  (bri * s) / (l < 50)? (l * 2) : ((200 - l) * 2)
  }
   return "hsl("+hue+","+s+"%,"+l+"%)";
}
  


$(document).ready(function(){
   getQuotes();

 });
  

let quoteArray;

const url = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json'

function getQuotes(){
    fetch(url).then((response)=>{
      response.json().then((json)=>{
        quoteArray = json.quotes;
        console.log('quotesData');
        console.log(quoteArray.length);
        console.log(quoteArray);
      })
    })
}
//redux
 
const NEW = 'NEW';
 
 
const nQuote = (quote)=>{
  return {
    type: 'NEW',
    quote: quote //supposed to be the quote object
  }
}

const quoteReducer = (state={ quote : 'Random Quote Machine',
      author : 'A project by Efe'}, action) => {
  switch(action.type){
    case NEW:
      return {
        quote: action.quote.quote,
        author: action.quote.author
      }
      
    default:
       return state;
  }
};

const store = Redux.createStore(quoteReducer);

//React
 
 class QuoteComponent extends React.Component {
  constructor(props) {
    super(props);

    this.newQuote = this.newQuote.bind(this);
  }
  
  newQuote(){
    //call newQuote from props. newQuote is found //in props thanks to mapDispatchToProps. Pass in //quoteArray gotten from the remote server earlier.
    var h = Math.floor(Math.random()*360);
    var s = Math.floor(Math.random()+10);
    var b = Math.floor((Math.random()*20)+30);
    
    this.props.newQuote(quoteArray);
    $("#quote-box").css("background-color", hsb(h,s,b));
    $("body").css("background-color", hsb(h,s,b+40));
     $("#tweet-quote").css("color", hsb(h,s,b+40));
    // document.getElementById("quote-box").style.backgroundColor = hsb(16,10,Math.floor(Math.random()*100));
    //calculate the random number within the array and use that as the index to fetch
  }
  
  render() {
    return (
      <div id="quote-box">
        <h1 id="text">{this.props.quoteObj.quote}</h1>
        <h2 id="author">{this.props.quoteObj.author}</h2>
        <button id="new-quote" onClick={this.newQuote}>new quote</button>
        <a id="tweet-quote" href={"https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text="+this.props.quoteObj.quote+"-"+this.props.quoteObj.author} target="_top"><h2>tweet quote</h2></a>
      </div>
    );//codepen environment renders differently, the h3 and h4 tags in particular, differently from the native browser.
  }
};


//reactredux

const mapStateToProps = (state)=>({
  quoteObj: state
})

const mapDispatchToProps = (dispatch) =>({
  newQuote: (quoteArray)=>{
    dispatch(nQuote(quoteArray[ Math.floor(Math.random() * quoteArray.length)]));
  }
})

const Provider = ReactRedux.Provider;
const connect = ReactRedux.connect;

const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(QuoteComponent)

class AppWrapper extends React.Component {
  // Render the Provider below this line
  render() {
      return (
        <Provider store={store}>
          <ConnectedComponent/>
        </Provider>
      );
    }

  // Change code above this line
};


export default AppWrapper;
