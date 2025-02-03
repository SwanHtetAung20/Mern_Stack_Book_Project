import { CustomApiError } from "./customError.js";
import { StatusCodes } from "http-status-codes";

export class BadRequest extends CustomApiError {
  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}
