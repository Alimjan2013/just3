import React ,{useState,useEffect} from 'react'
import Things from './components/things';


const App = ()=>{
  const [things,setThings] =useState({})

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
  
  let todydate
  const date = new Date(things.date);
  if(date.getMonth() !== NaN){
    todydate = <div>
              <div>
                {date.getMonth()+1}
              </div>
              <div>
                {date.getDate()}
              </div>
            </div> 
  }
   

  return(
    <div>
      {todydate}
      <Things things={things}/>
    </div>
  )

}



export default App;
