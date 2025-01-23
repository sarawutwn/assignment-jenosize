import type { Request, Response } from "express";
import type { AuthService } from "../services/auth.service";
import { SignInDto, SignUpDto } from "../../ports/auth/auth.dto";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";

export class AuthController {
  constructor(private service: AuthService) {}

  async signIn(req: Request, res: Response): Promise<void> {
    try {
      // Validate ข้อมูล
      const Body = plainToInstance(SignInDto, req.body);
      const errors = await validate(Body);
      if (errors.length > 0) {
        const errorMessages = errors.map(error => Object.values(error.constraints || {}).join(", "));
        res.status(400).json({ status: 400, errors: errorMessages });
        return;
      }
      // ส่งข้อมูลที่ Validate แล้วเข้าไปทำงานต่อที่ Service.
      const result = await this.service.signIn(Body.username, Body.password);
      if (result.error) {
        res.status(400).json({ status: 400, errors: result.result });
        return;
      }
      res.status(200).json({ status: 200, result: result.result });
    } catch (err) {
      console.log(err);
      res.status(500).json({ status: 500, error: "Internal Server Error." });
    }
  }

  async signUp(req: Request, res: Response): Promise<void> {
    try {
      // Validate ข้อมูล
      const Body = plainToInstance(SignUpDto, req.body);
      const errors = await validate(Body);
      if (errors.length > 0) {
        const errorMessages = errors.map(error => Object.values(error.constraints || {}).join(", "));
        res.status(400).json({ status: 400, errors: errorMessages });
        return;
      }
      // ส่งข้อมูลที่ Validate แล้วเข้าไปทำงานต่อที่ Service.
      const result = await this.service.signUp(Body.username, Body.password, Body.fullname);
      if (result.error) {
        res.status(400).json({ status: 400, message: result.message });
        return;
      }
      res.status(200).json({ status: 200, message: result.message });
    } catch (err) {
      console.log(err);
      res.status(500).json({ status: 500, error: "Internal Server Error." });
    }
  }
}
