import express from "express";
import "dotenv/config";
import "express-async-errors";
import cors, { CorsOptions } from "cors";
import { connect } from "./db/connect.js";
import authRouter from "./routes/auth.js";
import bookRouter from "./routes/books.js";
import isAuthorize from "./middlewares/auth.js";
import cookieParser from "cookie-parser";
import { customErrorHandler } from "./middlewares/errorHandler.js";

const allowedOrigins = [process.env.CLIENT_URL];
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: (
      origin: string | undefined,
      callback: (err: Error | null, allow: boolean) => void
    ) => {
      if (allowedOrigins.includes(origin as string) || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"), false);
      }
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  } as CorsOptions)
);

// * routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/books", isAuthorize, bookRouter);

// * middleware
app.use(customErrorHandler);

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    await connect(process.env.MONGO_URL);
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
