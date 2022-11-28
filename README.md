# Social-Network-API

## Screencastify Link:
https://watch.screencastify.com/v/urxcMqF4fe2IeZhfx7qR

## Usage
Using the command line the user should first run an "npm i" to download all dependencies for this application.  To start the application the user should run "npm start" to initiate the PORT listener.  To check the accuracy of the routes and information now stored in mongoDB use insomnia to enter http://localhost:3001/api/ and test out the get, post, put, and delete controllers and routes for all information.  

## Technologies Used
- Express.js - Express is a node js web application framework that provides broad features for building web and mobile applications. 
- MongoDB Atlas- fully-managed cloud database that handles all the complexity of deploying, managing, and healing your deployments on the cloud service provider of your choice .
- Mongoose - Mongoose provides a straight-forward, schema-based solution to model your application data. 
- Node.js - An asynchronous event-driven program to run Javascript.
- JavaScript - Allows developer to make static webpages dynamic and interactive.  For this exercise it was used to alter the original webpage to change the questions, change the answers, add a dynamic timer/countdown(that also ends the game), as well as, allow saving of scores.
- Git - Git is what I used to work on my personal computer and pushing my work to GitHub.
- GitHub - A cloud based repository that holds my saved code reserved for resetting my personal computer deployment.

## Description

The purpose of this project was to utilize our skills with noSQL models, associating those models through association methods and writing routes for an entire backend server development that a social networking platform could utilize.

## Installation

Navigate to file using your command line and run 'npm i'.  To initiate the localhost port listener run npm start or node serve.js in your command line.

## Lessons Learned
The most effective lessons learned for me were...
1. Writing models using noSQL and integrating two models in a route.  



## Code Snippets
JavaScript
```javaScript
 deleteThought(req, res) {
        Thoughts.findOneAndRemove(
            { _id: req.params.thoughtId }
        )
            .then((thoughtData) => {
                if(!thoughtData){
                 return res.status(404).json({message: "No thought with this id"})
                }
                res.json({message: "success"})
                 return User.findOneAndUpdate(
                    {thoughts: req.params.thoughtId},
                    {$pull: {thoughts: req.params.thoughtId}},
                    {new: true}
                );
                
            })
            .catch((err) => res.status(500).json(err));
    },
```
```JavaScript
const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
      username: {
        type: String,
        required: true,
        unique: true,
        trimmed: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, "must be valid email"],
      },
     
      thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: "thoughts",
        }
      ],
      friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'user',
        }
      ]
    },
    {
      toJSON: {
        virtuals: true,
      },
      id: false,
    }
  );
  userSchema.virtual("friendCount").get(function(){
    return this.friends.length;
  })
  const User = model('user', userSchema);
  
  module.exports = User;
```

## Credits

NA

## License
Please refer to the LICENSE in the Repo.