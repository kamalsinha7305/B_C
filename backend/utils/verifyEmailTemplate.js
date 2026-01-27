const verifyEmailTempplate = ({name , url} )=>{
    return `
    <p> Dear ${name} </p>
    <p> thank you for registering BInklit </p>
    <a href=${url}> Verify Email  </a>
    `

}

export default verifyEmailTempplate