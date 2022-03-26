
const Thing = (props)=>{
    let thingName = props.thing
    let status = props.things[thingName]
    return (
       <div>
        {thingName}
        {status.toString()}
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
        <div>
        {thingsGroup}
        </div>  
    )
}


export default Things