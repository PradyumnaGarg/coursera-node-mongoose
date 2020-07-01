const mongoose = require("mongoose");

const Dishes = require("./dishes");

const url = "mongodb://localhost:27017/conFusion";

const connect = mongoose.connect(url);

connect.then((db) => {
    console.log("Connected to the server correctly");   
    
    Dishes.create({
        name : "Pizza",
        description: "Big"
    })
    .then((dish) => {
        console.log(dish);

        return Dishes.findByIdAndUpdate(dish._id, {
            $set: {description: "Updated Big"} 
        },
        {
            new: true
        })
        .exec();      
    })
    .then((dish) => {
        console.log(dish);
        
        dish.comments.push({
            rating: 5,
            comment: "Nice dish",
            author: "Tcs"
        })
        return dish.save();
    })
    .then((dish) =>{
        console.log(dish);

        return Dishes.remove({});
    })
    .then(() => {
        return mongoose.connection.close();
    })
    .catch((err) => {
        console.log(err);
    });
});
