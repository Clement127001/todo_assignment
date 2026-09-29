import app from "./app.js";
import { env } from "./config/env.js";
import { connectDatabase } from "./config/db.js";

const PORT = env.PORT || 3001;

async function start() {
  try {
    await connectDatabase();

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.log("Connection Error : Failed to connect DB");
  }
}

start();
