import dotenv from "dotenv";
import { connectDb } from "./database/index.js";
import { app } from "./app.js";
import Bookroutes from "./route/bookroutes.js";

dotenv.config();

const PORT = process.env.PORT || 7000;

app.use("/api/v1/books", Bookroutes);
app.get('/', (req, res) => {
  res.send('Hello, server!');
});

connectDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server Running on PORT ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB connection failed", err);
  });
