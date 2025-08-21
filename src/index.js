import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./db/index.js";

dotenv.config({
  path: "./.env",
});

const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => {
    console.log(`Example app listening on port http://localhost:${PORT}`);
  })
  .catch((error) => {
    console.error("Failed to connect to the database:", error);
    process.exit(1); // Exit the process with failure
  });

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
