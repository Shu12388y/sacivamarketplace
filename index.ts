import { app } from "./server";
import { connectDB } from "./database/db";



connectDB().then(() => {
    app.listen(process.env.PORT, () => {
        console.log("server is on " + process.env.PORT)
    })
}).catch(err => {
    console.log(err)
})
