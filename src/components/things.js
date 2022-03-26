import React ,{useState,useEffect} from 'react'

const Thing = (props)=>{
    let thingName = props.thing
    const [status,setState] =useState()

    useEffect(() => {
        setState(props.things[thingName])
      }, []);

    const handleOnClick = ()=>{
        props.changestatus(thingName,!status)
        setState(!status)
    }
    return (
       <div className="flex-1 flex flex-col items-center space-y-2 ">
        <input 
            onClick={()=>{handleOnClick()}}  
            className=" rounded-md bg-fill-2   w-20 h-20  border-4 border-black appearance-none checked:bg-green-1    " 
            type="checkbox" 
            defaultChecked = {status}
            />
        <p>
        {thingName}
        </p>
        
        
       </div> 
    )
}
const Things = (props)=>{
    const ThingList = props.things.things
    let thingsGroup
    console.log(ThingList)
    const changestatus =(key,status)=>{
        console.log(status)
        console.log()
        fetch('https://qcuud7.api.cloudendpoint.cn/updateThing',{
            method:"POST",
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify({id: props.things._id,thingName:key,status:status})
          })
            .then(res=>res.json())
            .then(
              json=>{
                console.log(json.test)
              })  
    }

    if(ThingList === undefined ){
        thingsGroup =''
    }else{
        thingsGroup = Object.keys(ThingList).map((item) => <Thing key={item} things={props.things.things} thing={item} changestatus={changestatus.bind()}/>)
    }
    
    return(
        <div className="flex">
        {thingsGroup}
        </div>  
    )
}


export default Things