import "./index.css"
import { Component } from "react"
import Popup from "reactjs-popup"


class Home extends Component{
  state = {activeKey:"",
           isCapslock:false,
           givenSentence:"She created an app to match zombies with willing victims.",
           timer:0,
           userInput:"",
           intervalId : null,
           submitTimer:0,
           results:false,
           accuracy:0
  }

  randomSentenceButton = () => {
    const randomSentences = [
      "Being the last male on my dad's side of the family has its perks.",
      "I have already completed 4 out of 6 tasks I need to do today.",
      "As luck would have it, I found a pen at the bottom of my bag.",
      "Crime is certainly on the increase in many of our cities.",
      "Laken bought a computer at thirty percent off the list price.",
      "She smiled so hard her front tooth popped out.",
      "When John goes on a date, he's known to be a big spender.",
      "My only thing is that I'm working from home tomorrow.",
      "There is a species of humans called 'hobbits' which were very short and lived on an island in Indonesia thousands of years ago.",
      "He figured a good home security system was the best insurance policy.",
      "On top of that, our power has been out since Sunday.",
      "Tom is now looking for a bigger house to live in.",
      "I couldn't tear myself away from you even if I tried.",
      "It's about as exciting as watching paint dry.",
      "I like blueberries and mangoes but not strawberries.",
      "Most people likely believe that a majority of our ability to taste things comes from our taste buds.",
      "Let's all just take a moment to breathe, please!",
      "She thought Conan O'Brian was the only good late-night TV host.",
      "While the man was hunting the deer, it ran through the forest.",
      "The camping trip was so awesome that I didn't want to come home."
      ]
      const randomNumber = Math.floor(Math.random()*20)
      this.setState({givenSentence : randomSentences[randomNumber]})
  }

  gettingStartedButton = () => {
    this.setState({givenSentence: "asdf;jkl"})
  }

  onRestart = () => {
    this.setState({ timer: 0, userInput: "" });
    this.randomSentenceButton();
  };
  
  onUserInputChange = (e) => {
    this.setState({userInput:e.target.value})
  }

  calculateAccuracy = () => {
    const { givenSentence, userInput } = this.state;
  
    const tokens1 = givenSentence.split(' ');
    const tokens2 = userInput.split(' ');
  
    const intersection = tokens1.filter(token => tokens2.includes(token));
    const accuracy = Math.floor((intersection.length / tokens1.length) * 100);
  
    return accuracy;
  };

  onTypeAgainClick = () => {
    this.onRestart()
    this.setState({results:false})
  }

  startTimer = () => {
    const intervalId = setInterval(() => {
      this.setState((prevState) => ({
        timer: prevState.timer + 1
      }));
    }, 1000);
    this.setState({ intervalId: intervalId });
  };

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress);
    this.startTimer();
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress);
    clearInterval(this.state.intervalId);
  }

  onSubmit = () => {
    clearInterval(this.state.intervalId);
    this.setState({ intervalId: null });
    this.setState({submitTimer:this.state.timer})
    this.setState({results:true})
    const accuracy = this.calculateAccuracy();
    this.setState({accuracy})
  };

  handleKeyPress = (event) => {
    this.setState({activeKey:event.key})
    if (event.key === "CapsLock") {
      this.setState((prevState) => ({ isCapslock: !prevState.isCapslock }));
    }
  };

  capslockKeyboard = () => {
    const {activeKey} = this.state
    return (
      <div className="keyboard-c">
        <div className="keyboard-row">
            {["`", "1", "2", "3", "4", "5", "6","7","8","9","0","-","=","Backspace"].map((letter, index) => (
              <div key={index} className={activeKey === letter ? "semi-active-key" : "key"}>
                {letter}
              </div>
            ))}
          </div>
          <div className="keyboard-row">
            {["Tab", "q", "w", "e", "r", "t", "y","u","i","o","p","[","]","|"].map((letter, index) => (
              <div key={index} className={activeKey === letter ? "semi-active-key" : "key"}>
                {letter}
              </div>
            ))}
          </div>
          <div className="keyboard-row">
            {["CapsLock", "a", "s", "d", "f", "g", "h","j","k","l",";","'","Enter"].map((letter, index) => (
              <div key={index} className={activeKey === letter ? "semi-active-key" : "key"}>
                {letter}
              </div>
            ))}
          </div>
          <div className="keyboard-row">
            {["Shift", "z", "x", "c", "v", "b", "n","m",",",".","/","Shift"].map((letter, index) => (
              <div key={index} className={activeKey === letter ? "semi-active-key" : "key"}>
                {letter}
              </div>
            ))}
          </div>
          <div className={activeKey === " " ? "semi-active-key space" : "key space"}>
                Space
          </div>
      </div>
    )
  }

  nonCapslockKeyboard = () => {
    const {activeKey} = this.state
    return (
      <div className="keyboard-c">
        <div className="keyboard-row">
            {["`", "1", "2", "3", "4", "5", "6","7","8","9","0","-","=","Backspace"].map((letter, index) => (
              <div key={index} className={activeKey === letter ? "semi-active-key" : "key"}>
                {letter}
              </div>
            ))}
          </div>
          <div className="keyboard-row">
            {["Tab", "Q", "W", "E", "R", "T", "Y","U","I","O","P","[","]","|"].map((letter, index) => (
              <div key={index} className={activeKey === letter ? "semi-active-key" : "key"}>
                {letter}
              </div>
            ))}
          </div>
          <div className="keyboard-row">
            {["CapsLock", "A", "S", "D", "F", "G", "H","J","K","L",";","'","Enter"].map((letter, index) => (
              <div key={index} className={activeKey === letter ? "semi-active-key" : "key"}>
                {letter}
              </div>
            ))}
          </div>
          <div className="keyboard-row">
            {["Shift", "Z", "X", "C", "V", "B", "N","M",",",".","/","Shift"].map((letter, index) => (
              <div key={index} className={activeKey === letter ? "semi-active-key" : "key"}>
                {letter}
              </div>
            ))}
          </div>
          <div className={activeKey === " " ? "semi-active-key space" : "key space"}>
                Space
          </div>
      </div>
    )
  }

  renderKeyboard = () => {
    const {isCapslock,givenSentence,timer,userInput} = this.state
    return (
      <div>
        <div className="keyboard disable-select">
          <h1 className="main-heading disable-select">TOUCH TYPING</h1>
          <div className="question-contianer">
            <p className="question-heading disable-select">See The Below Displayed text and ReType in the Designated Column</p>
            <h1 className="sentence disable-select">{givenSentence}</h1>
          </div>
        <div className="text-area">
          <textarea className="input" type="text" placeholder="Tap Hear To Start Typing" value={userInput} onChange={this.onUserInputChange}/>
          <div className="buttons-container">
            <div>
              <button type="button" className="button" onClick={this.gettingStartedButton}>Getting Started</button>
              <button type="button" className="button" onClick={this.randomSentenceButton}>Random Sentence</button>
            </div>
            <div>
              {/* <button type="button" className="button" onClick={this.onClickGuide}>Guide</button> */}
              <Popup
                trigger={<button className="button"> Guide </button>}
                modal
                nested
              >
                {close => (
                  <div className="modal">
                    <button className="close" onClick={close}>
                      &times;
                    </button>
                    <strong className="header"> GUIDE - Getting Started With Website</strong><br/>
                    <div className="content">
                      {' '}
                      <br/>
                      This Website is created as part of my assinment for my job and by this web application 
                      you can learn typing and get your score and accuracy
                      <br />
                      <img className="guide-image-size" src="https://www.speedtypingonline.com/images/HomePosition_wHands.svg" alt="guide-pic"/>
                      <p>As you can see the Above image that was the standard position of hands on the keyboard.<br/>
                      first start with the basic getting started in the website and the use random sentence genarations to improve your typing speed.<br/>
                      <strong> You Will Get Your Results as You Press Submit after typing the sentence</strong>
                      for More help Mail @<a style={{color:"#ffffff"}} href="mailto:surukutlasampath12@gmail.com">surukutlasampath12@gmail.com</a>
                      </p>
                    </div>
                    <div className="actions">
                      <button
                        className="button"
                        onClick={() => {
                          console.log('modal closed ');
                          close();
                        }}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                )}
              </Popup>

              <button type="button" className="button" onClick={this.onRestart}>Restart</button>
              <button type="button" className="button" onClick={this.onSubmit}>Submit</button>
              <p className="timer button">{timer}</p>
            </div>
          </div>
        </div>
        {isCapslock ? this.nonCapslockKeyboard() : this.capslockKeyboard()}
        </div>
        <div className="mobile-error">
          <img className="caution" src="https://static.vecteezy.com/system/resources/thumbnails/017/177/727/small/caution-warning-sign-on-transparent-background-free-png.png" alt="caution"/>
          <h1 className="error-message">This Website Made for Desktop Version</h1>
        </div>
      </div>
    );
  }

  renderResults = () => {
    const {givenSentence,submitTimer,userInput,accuracy} = this.state
    return(
      <div>
        <div className="keyboard disable-select">
          <h1 className="main-heading disable-select">TOUCH TYPING</h1>
          <p className="question-heading disable-select">Your results</p>
          <div className="res-cont">
              <p className="results-quote">Given Sentence:</p>
              <p className="sentence result-sent">{givenSentence}</p>
              <p className="results-quote">Sentence Typed by You in <span>{submitTimer}</span> Seconds:</p>
              <p className="sentence result-sent">{userInput}</p>
              <p className="results-quote">Result</p>
              <p className="sentence result-sent">{givenSentence === userInput ? "Perfectly Matched" : "Not Matched"}</p>
              <p className="results-quote">Accuracy:</p>
              <p className="sentence result-sent">{accuracy}</p>
          </div>
          <button type="button" className="button" onClick={this.onTypeAgainClick}>Type Again</button>
        </div>
      </div>
    )
  }

  render(){
    const {results} = this.state
    return(
      <div>
        {results ? this.renderResults() : this.renderKeyboard()}
      </div>
    )
  }
}

export default Home