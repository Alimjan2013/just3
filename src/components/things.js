
const Thing = (props)=>{
    let thingName = props.thing
    let status = props.things[thingName]
    const handleOnClick = ()=>{

        status = !status
    }
    return (
       <div className="flex-1 flex flex-col items-center space-y-2 ">
        <input 
            onClick={()=>{handleOnClick()}}  
            className="bg-fill-1 rounded-md bg-fill-2   w-20 h-20  border-4 border-black appearance-none checked:bg-green-1    " 
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
    

    if(ThingList === undefined ){
        thingsGroup =''
    }else{
        thingsGroup = Object.keys(ThingList).map((item) => <Thing key={item} things={props.things.things} thing={item}/>)
    }
    
    return(
        <div className="flex">
        {thingsGroup}
        </div>  
    )
}


export default Things