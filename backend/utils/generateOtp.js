export  const generateOtp =async ()=>{
    return Math.floor(Math.random()* 900000) + 100000 // gives number between 100000 to 900000
}