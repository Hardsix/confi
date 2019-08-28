import { HttpException } from "@nestjs/common";

export class ValidationError extends HttpException {
  constructor(response: string | object) {
    super(response, 400);
  }
}
