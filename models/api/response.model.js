module.exports = (status="success",message="OK",data={})=>{
    //status -success or failed or error
    return {
        status:status,
        message:message,
        data:data}
}