const mongoose = require('mongoose');

// const mongoConnectionString = 'mongodb://localhost:27017/mydatabasename';
const mongoConnectionString = "mongodb+srv://rsp:asciiZ99@rspcluster.hqkr1yq.mongodb.net/tablemart?retryWrites=true&w=majority&appName=rspcluster";

// const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

// Connect to MongoDB
mongoose.connect(mongoConnectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });


module.exports=mongoose;