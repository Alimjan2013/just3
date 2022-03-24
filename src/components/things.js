
const Thing = (props)=>{
    console.log(props.thing)
   
    console.log(JSON.stringify(props.things))

    // const status = props.things.filter(item =>item.id == postID)
    return (
       <div>
        {props.thing}
        {}
       </div> 
    )
}
const Things = (props)=>{
    const ThingList = props.things.things
    let thingsGroup
    console.log(ThingList)

    // if(props.things!==undefined){
    //     thingsGroup = ThingList.map((item) => <Thing things={props.things} thing={item}/>)
    // }
        
    
    return(
        <div>
        {thingsGroup}
        </div>  
    )
}


export default Things