const forgotPaswordTemplate =({name, otp})=>{
    return `
    <div>

    <h2>Reset your password </h2>
    <p>Hello ${name} you are requested to reset your password .Please use following otp  <P>
    <h2> ${otp}</h3>

    <p> this otp is valid for only one hour .ENter this otp in this binkeyil webiste to preeed with reseetting your password </p>
   <p>Thank you</p>
    </div>
    `
}
export default forgotPaswordTemplate ;


