const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose
  .connect("mongodb://localhost:27017/yelpCamp", { 
    useNewUrlParser: true,  
    useCreateIndex: true,
    useUnifiedTopology: true
    })
  .then(() => {
    console.log("Mongo Database Connected");
  })
  .catch((err) => {
    console.log("Error Occurred");
    console.log(err);
  });
  
const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 10; i++) {
        const rand = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 50000 + 1000);
        const c = new Campground({
          author: "60bcf8beb62e25341cc95789",
          title: `${sample(descriptors)} ${sample(places)}`,
          location: `${cities[rand].city}, ${cities[rand].state}`,
          description: "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.",
          price,
          geometry: {
            type: "Point",
            coordinates: [
              cities[rand].longitude,
              cities[rand].latitude
            ]
          },
          images: [
            {
              url: 'https://res.cloudinary.com/dgdqo0uxp/image/upload/v1623148284/YELPCAMP/fn7gwo7et5bui6aiwr1x.jpg',
              filename: 'YELPCAMP/fn7gwo7et5bui6aiwr1x'   
            }
          ]
        })
        await c. save();
    }
}

seedDB().then( () => {
    mongoose.connection.close();
});