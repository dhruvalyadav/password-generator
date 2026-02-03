
import { useEffect, useState, useRef } from 'react'
import './App.css'
import { useCallback } from 'react';

// passeord generator code 
function App() {
  const [length,setLength] = useState(8)
  const [numberAllowed, SetNumberAllowed]=useState(false);
  const [characters,setCharacters]= useState(false);
  const [password, setPassword] = useState("")
  
  //password refernce 
  const passwordRef = useRef(null)
  const copyPasswordToClipborad = useCallback(()=>{ 
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,101)
    window.navigator.clipboard.writeText(password) 
    },[password])

  //generate password function 
  const passwordGenerator = useCallback(()=>{
    let pass = "",
        str="ABCDEJGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed) str+="0123456789"
    if(characters) str+="!@#$%&*_=+/<>[]{}"

    for (let i=0;i<length;i++){
      let char = Math.floor(Math.random()*str.length + 1)
      pass += str.charAt(char)

    }
    setPassword(pass)
  },[length,numberAllowed,characters])

  useEffect(()=>{passwordGenerator},[length, characters, numberAllowed])

  return (
    <>
     <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-grey-700'>
      <div className='w-full shadow-md overflow-hodden mb-4'>
        <input type="text"value={password} placeholder='Password' readOnly ref={passwordRef} />
        <button className='outline-none bg-blue-700 text-white px-3 py-0.5' onClick={copyPasswordToClipborad}
        >Copy</button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex item-center gap-x-1'>
          <input type="range" value={length} min={6} max={100} className='cursor-pointer' onChange={(e)=>{setLength(e.target.value)}}/>
          <label>Length:{length}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input type="checkbox" defaultChecked={numberAllowed} id='numberInput' onChange={()=>{SetNumberAllowed((prev)=>(!prev))}} />
          <label htmlFor='numberInput'> Numbers </label>
        </div>
        <div>
          <div className="felx item-center gap-x-1">
            <input type="checkbox" defaultChecked={characters} id='characterInput' onChange={() =>{setCharacters((prev)=>!prev)}} />
            <label htmlFor="characterInput"> Characters </label>
          </div>
        </div>

      </div>
     </div>
    </>
  )
}

export default App
