/**
  * @param params 调用参数，HTTP 请求下为请求体
  * @param context 调用上下文
  *
  * @return 函数的返回数据，HTTP 场景下会作为 Response Body
  *
  * 完整信息可参考：
  * https://qingfuwu.cn/docs/cloud-function/basic.html
  */


 const getDayString = (date) =>{
    const year = date.getFullYear()
    const month = date.getMonth() +1
    const day = date.getDate()
    return {year:year,month:month,day:day}
  }
  const whatToday = () =>{
    const today = new Date(Date.now())
    const date = getDayString(today)
    const trydate=`${date.year}-${date.month}-${date.day} 00:00:00+08`
    const fromdate = new Date(trydate)
    const todate = new Date(`${date.year}-${date.month}-${date.day+1} 00:00:00+08`)
    return {fromdate:fromdate,todate:todate}
  }
  const getAWeek = () =>{
      const Adate = new Date(Date.now())
      const ADayInAWeek = Adate.getDay()
      Adate.setDate(Adate.getDate()-ADayInAWeek)
      const datestart = getDayString(Adate)
      const trydateStart=`${datestart.year}-${datestart.month}-${datestart.day} 00:00:00+08`
      const weekStart = new Date(trydateStart)
      Adate.setDate(weekStart.getDate()+6)
      const dateend = getDayString(Adate)
      const trydateEnd=`${dateend.year}-${dateend.month}-${dateend.day+1} 00:00:00+08`
      console.log(trydateEnd)
      const weekEnd = new Date(trydateEnd)
  
      return{
          weekStart:weekStart,
          weekEnd:weekEnd
      }
  }
  
  
  
  module.exports = async function(params, context) {
    console.log(params);
    if(params.user_id !== '' && params.user_id){
      const today = whatToday()
      const things = inspirecloud.db.table('things');
      const result = await things.where({
        userID: params.user_id,
        createdAt:inspirecloud.db.gt(today.fromdate).lte(today.todate)
        }).find();
        if(result.length === 0){
            const newThings = things.create({userID: params.user_id,things:{
              "English": false,
              "Coding": false,
              "Workout": false
            },date:new Date(Date.now())});
            await things.save(newThings);
            const newResult = await things.where({
                userID: params.user_id,
                createdAt:inspirecloud.db.gt(today.fromdate).lte(today.todate)
                }).find();
                 return{
                  newResult
                }
          } 
       
      return {
        result
      };
    }
  }
  // module.exports = async function(params, context) {
  //   console.log(params);
  //   if(params.user_id !== '' && params.user_id){
  //     const thisWeek= getAWeek()
  //     const things = inspirecloud.db.table('things');
  //     console.log(thisWeek)
  //     const result = await things.where({
  //       userID: params.user_id,
        
  //       createdAt:inspirecloud.db.gt(thisWeek.weekStart).lte(thisWeek.weekEnd)
  //       }).find();     
  //     return {
  //       result
  //     };
  //   }
  // }