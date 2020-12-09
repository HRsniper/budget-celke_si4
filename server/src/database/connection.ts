import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/budget", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
// .then(() => console.log("Conexão com o MongoDB realizado com sucesso!"))
// .catch((error) => console.log("Conexão com o MongoDB não pode ser realizada: " + error));

// mongoose.Promise = global.Promise;

export const Mongoose = mongoose;
