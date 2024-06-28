//this is kind of one to few relation in our database
const mongoose = require("mongoose");
const { Schema } = mongoose;
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/relationDemo");
}

main()
  .then(() => {
    console.log("connected successfully");
  })
  .catch((err) => {
    console.log(err);
  });

//defining schema here
const userSchema = new Schema({
  username: String,
  addresses: [
    {
      _id: false, //if we dont wants to create the separate id then we can do it setting _id attribute as false
      location: String,
      city: String,
    },
  ],
});

//creating a user collection so that we can insert the data in the same
const User = mongoose.model("User", userSchema);

//inserting the data 
const addUsers = async () => {
  let user1 = new User({
    username: "shubham ranjane",
    addresses: [
      { location: "at ghavar velhe", city: "pune" },
      { location: "katraj", city: "pune" },
    ],
  });
  user1.addresses.push({ location: "ghansoli navi mumbai", city: "mumbai" });
  let result = await user1.save();
  console.log(result);
};

addUsers();
