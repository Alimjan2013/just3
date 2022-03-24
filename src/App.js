import React ,{useState,useEffect} from 'react'
import Things from './components/things';


const App = ()=>{
  const [things,setThings] =useState([])
  let main 
  const findThings =(user_id)=>{
    
    fetch('https://qcuud7.api.cloudendpoint.cn/findThing',{
      method:"POST",
      headers: {'Content-Type': 'application/json'},
      body:JSON.stringify({user_id: user_id,})
    })
      .then(res=>res.json())
      .then(
        json=>{
          console.log(json.result)
          setThings(json.result[0])
        })
  }
  useEffect(() => {
    findThings("Alimjan")
  }, []);




  return(
    <div>
      <Things things={things}/>
    </div>
  )

}



export default App;
