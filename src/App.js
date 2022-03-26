import React ,{useState,useEffect} from 'react'
import Things from './components/things';


const App = ()=>{
  const [things,setThings] =useState({})
  let main 
//   const things ={
//     "_id": "623c5c743f6845022f9007f4",
//     "createdAt": "2022-03-24T11:56:36.120Z",
//     "updatedAt": "2022-03-24T13:22:21.164Z",
//     "date": "2022-03-24T11:56:36.000Z",
//     "things": [
//         "english",
//         "workout",
//         "coding"
//     ],
//     "userID": "Alimjan",
//     "thingsStatus": [
//         true,
//         false,
//         false
//     ]
// }
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
