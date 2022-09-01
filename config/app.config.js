require("dotenv").config();
module.exports={
    program: "car care management",
    version:"1.0.0",
    release:'01',
    port:process.env.PORT,
    environment:process.env.ENVIRONMENT
}