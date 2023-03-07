import React, {useState, useEffect, useRef} from "react";

function App() {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [cvc, setCvc] = useState("");
  const [error, setError] = useState(false)

  const maskNumber = '#### #### #### ####';
  const maskMonth = '##';
  const maskYear = '##';
  const maskCvc = '###';
 
  const focus = useRef(null);
  
  function handleInput(mask, key, arr){
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
      isNumber(key)
    }else if(!numbers.includes(key) && !(key == "Backspace")) {
      isNumber(key)
    }
  }


function handleNumber(e){
  const temp = [...number]
  handleInput(maskNumber, e.key, temp)
  setNumber(temp.join(""))
}

function handleMonth(e){
  const temp = [...month]
  handleInput(maskMonth, e.key, temp)
  setMonth(temp.join(""))
}
function handleYear(e){
  const temp = [...year]
  handleInput(maskYear, e.key, temp)
  setYear(temp.join(""))
}
function handleCvc(e){
  const temp = [...cvc]
  handleInput(maskCvc, e.key, temp)
  setCvc(temp.join(""))
}


  function isNumber(key){
    if(!isNaN(key)){
      setError(false)
    }else{
      setError(true)
    }


    // toExamine.forEach(toExam =>{
    //   const toNumber = toExam.map(Number);
    //   const exame = toNumber.every(item => !isNaN(item))
    //   console.log(exame)
    //   if(exame){setError(true)}
    // })
    
  }

  useEffect(()=> {
    focus.current.focus()
  }, [])

  // function submitValidation(e){
  //   e.preventDefault();
  // }





  return (
    <React.Fragment>
      <section>
        <article>
          <p>{name}</p>
          <p>{number}</p>
          <p>{month}</p>
          <p>{year}</p>
        </article>
        <article>
          <p>{cvc}</p>
        </article>
      </section>
      <main>
        <form >
          <label>CARDHOLDER NAME</label>
          <input type="text" value={name}  ref={focus} onChange={(e) =>{ setName(e.target.value)}}/>
          <label>CARD NUMBER</label>
          <input type="text"  value={number} onKeyDown={handleNumber}/>
          <p>{error ? "solo numeros" : ""}</p>
          <label>EXP. DATE</label>
          <input type="text" value={month} onKeyDown={handleMonth}/>
          <input type="text" value={year} onKeyDown={handleYear }/>
          <p>{error ? "solo numeros" : ""}</p>
          <label>CVC</label>
          <input type="text" value={cvc} onKeyDown={handleCvc}/>
          <input type="submit" value="Confirm"/>
          <p>{error ? "solo numeros" : ""}</p>
        </form>
      </main>
    </React.Fragment>
  );
}

export default App;
