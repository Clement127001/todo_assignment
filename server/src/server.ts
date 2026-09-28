import app from "./app.js";
import { env } from "./config/env.js";
import { connectDatabase } from "./config/db.js";
import notFound from "./middlewares/not-found.js";
import errorHandlerMiddleware from "./middlewares/error-handler.js";
import allowCrossDomain from "./middlewares/allow-cors.js";
import authMiddleware from "./middlewares/authentication.js";

const PORT = env.PORT || 3001;

app.use(allowCrossDomain);
app.use(authMiddleware);

app.use(notFound);
app.use(errorHandlerMiddleware);

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
