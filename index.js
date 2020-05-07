const mongoose = require("mongoose");

const Dishes = require("./dishes");

const url = "mongodb://localhost:27017/conFusion";

const connect = mongoose.connect(url);

connect.then((db) => {
    console.log("Connected to the server correctly");   
    
    var newDish = Dishes({
        name : "Pizza",
        description: "Big"
    });

    newDish.save()
        .then((dish) => {
            console.log(dish);

            return Dishes.find({});      
        })
        .then((dishes) => {
            console.log(dishes);

            return Dishes.remove({});
        })
        .then(() => {
            return mongoose.connection.close();
        })
        .catch((err) => {
            console.log(err);
        });
});
