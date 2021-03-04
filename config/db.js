const mongoose = require('mongoose');

// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(
//       'mongodb+srv://akshat:vikas@2021@cluster0.lapcs.mongodb.net/test?retryWrites=true&w=majority',
//       {
//         useFindAndModify: false,
//         useNewUrlParser: true,
//         useCreateIndex: true,
//         useUnifiedTopology: true,
//       }
//     );
//     // console.log(
//     //   `MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold
//     // );
//   } catch (error) {
//     console.log(`Error: ${error.message}`.red);
//     process.exit(1);
//   }
// };
// module.exports = connectDB;
const pass = 'IgGCeZB5Wo5AKSDF';
const mongoAtlasUri = `mongodb+srv://akshat:${pass}@cluster0.lapcs.mongodb.net/db?retryWrites=true&w=majority`;

const connectDB = async () => {
  try {
    // Connect to the MongoDB cluster
    const conn = await mongoose
      .connect(mongoAtlasUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then((res) => console.log('MongoDB Connected'.cyan.underline.bold));
    // .then((res) => console.log('connect', res));
  } catch (e) {
    console.log('could not connect');
  }
};
module.exports = connectDB;
