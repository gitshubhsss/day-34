const mongoose = require("mongoose");

const { Schema } = mongoose;

//Establish the connection beetween node and mongodb
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/relationDemo");
}

main()
  .then(() => {
    console.log("connection success");
  })
  .catch((err) => {
    console.log(err);
  });

const orderSchema = new Schema({
  item: String,
  price: Number,
});

const Order = mongoose.model("Order", orderSchema);

const customerSchema = new Schema({
  name: String,
  orders: [
    {
      type: Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
});

const Customer=mongoose.model("Customer",customerSchema);

const addCustomers = async () => {
    let cust1=new Customer({
        name:"omkar daswadkar",
    })

    let order1=await Order.findOne({item:"vadapav"})
    let order2=await Order.findOne({item:"chips"})

    cust1.orders.push(order1)
    cust1.orders.push(order2)

    let res=await cust1.save();
    console.log(res);
};

addCustomers();
// const addOrders = async () => {
//   let result = await Order.insertMany([
//     { item: "Samosa", price: 15 },
//     { item: "vadapav", price: 18 },
//     { item: "chips", price: 10 }
//   ]);
//   console.log(result);
// };

// addOrders()