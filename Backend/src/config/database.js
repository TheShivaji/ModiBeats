const mongoose = require("mongoose")


try{
function connectDb () {
    mongoose.connect(process.env.MOGODB_URL)
    .then(() => {
        console.log("database is connected")
    })
}
}catch(err){
    console.log("Error in database" , err.message)
}


module.exports = connectDb