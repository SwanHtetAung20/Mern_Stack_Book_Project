import express from "express";
import {
  createBook,
  getBooks,
  getSingleBook,
  updateBook,
  deleteBook,
} from "../controllers/books.js";
import { USER_ROLES } from "../models/Roles.js";
import verifyRoles from "../middlewares/verifyRoles.js";

const router = express.Router();

router.route("/").get(getBooks).post(createBook);
router
  .route("/:id")
  .get(getSingleBook)
  .patch(updateBook)
  .delete(verifyRoles(USER_ROLES.USER), deleteBook);

export default router;
