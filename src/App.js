import React, {useState, useEffect, useRef} from "react";
import SuccesForm from "./components/SuccesForm";
import "./style/App.css"

function App() {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [cvc, setCvc] = useState("");
  const [loading, setLoading] = useState(false)

  const maskNumber = '#### #### #### ####';
  const maskMonth = '##';
  const maskYear = '##';
  const maskCvc = '###';

  const focus = useRef(null);
  
  function handleInput(mask, key, arr, input){
    let numbers = ["0","1","2","3","4","5","6","7","8","9"];

    if(key == "Backspace" && arr.length > 0){
      arr.pop()
    }
    if( numbers.includes(key) && arr.length +1 <= mask.length){
      if(  mask[arr.length] == " "){
        arr.push(mask[arr.length], key)
      }else{
        arr.push(key)
      }
      isNumber(key, input)
    }
    else if(!numbers.includes(key) && !(key == "Backspace")) {
      isNumber(key, input)
    }
    console.log(key)
  }


  function handleNumber(e){
    const temp = [...number]
    handleInput(maskNumber, e.key, temp, e.target)
    setNumber(temp.join(""))
  }

  function handleMonth(e){
    const temp = [...month]
    handleInput(maskMonth, e.key, temp, e.target)
    setMonth(temp.join(""))
  }
  function handleYear(e){
    const temp = [...year]
    handleInput(maskYear, e.key, temp, e.target)
    setYear(temp.join(""))
  }
  function handleCvc(e){
    const temp = [...cvc]
    handleInput(maskCvc, e.key, temp, e.target)
    setCvc(temp.join(""))
  }

  function isNumber(key, input){
    if(!isNaN(key) || key == "Tab"){
      input.nextElementSibling.innerText = ""
    }
    else{
      if(input.nextElementSibling.nodeName == "INPUT"){
        input.nextElementSibling.nextElementSibling.innerText ="Solo numeros"
      }else{
        input.nextElementSibling.innerText = "Solo numeros"
      }
    }
  }

  useEffect(()=> {
    focus.current.focus()
  }, [])

  function submitValidation(e){
    e.preventDefault();
    if(!name){
      console.log("name is false")
    }
    if(!number){
      console.log("number is false")
    }
    if(!month){
      console.log("month is false")
    }
    if(!year){
      console.log("year is false")
    }
    if(!cvc){
      console.log("cvc is false")
    }
    if(name && number && month && year && cvc){
      setLoading(true)
    }
  }


  return (
    <React.Fragment>
      <section>
        <article className="front">
        <div className="icon_container">
          <svg width="84" height="47" viewBox="0 0 84 47" fill="none" xmlns="http://www.w3.org/2000/svg"><ellipse cx="23.478" cy="23.5" rx="23.478" ry="23.5" fill="#fff"/><path d="M83.5 23.5c0 5.565-4.507 10.075-10.065 10.075-5.559 0-10.065-4.51-10.065-10.075 0-5.565 4.506-10.075 10.065-10.075 5.558 0 10.065 4.51 10.065 10.075Z" stroke="#fff"/></svg>
        </div>
          
          <div className="text-container">
            <p className="number">{number}</p>
            <div className="text-container--data">
              <p className="name">{name}</p>
              <div>
                <p className="month">{month}/</p>
                <p className="year">{year}</p>
              </div>
            </div>
          </div>
          
        </article>
        <article className="back">
          <p>{cvc}</p>
        </article>
      </section>
      <main>
        {loading ? <SuccesForm/> : <form >
          <label>CARDHOLDER NAME</label>
          <input placeholder="e.g. Richard Tapia" type="text" value={name}  ref={focus} onChange={(e) =>{ setName(e.target.value)}}/>

          <label>CARD NUMBER</label>
          <input placeholder="e.g. 1234 5678 9123 0000" type="text" value={number} onKeyDown={handleNumber}/>
          <p ></p>

          <div className="input_container">
            <div className="input_container--date">
            <label>EXP. DATE</label>
              <div>
              <input placeholder="MM" type="text" value={month} onKeyDown={handleMonth}/>
              <input placeholder="YY" type="text" value={year} onKeyDown={handleYear }/>
              <p></p>
              </div>
            </div>

            <div className="input_container--cvc">
              <label>CVC</label>
              <input placeholder="e.g. 123" type="text" value={cvc} onKeyDown={handleCvc}/>
              <p ></p>
            </div>
          </div>

        </form>}
        <input type="submit" onClick={submitValidation} value={loading ? "Continue" : "Confirm"}/>
      </main>
    </React.Fragment>
  );
}

export default App;
