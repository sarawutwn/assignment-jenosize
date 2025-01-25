import express from "express";
import { PrismaClient } from "@prisma/client";
import { AuthController } from "../adapters/controllers/auth.controller";
import { AuthService } from "../adapters/services/auth.service";
import { BcryptUtils } from "../adapters/services/bcrypt.service";

const prisma = new PrismaClient();
const bcryptUtils = new BcryptUtils();

const router = express.Router();
const service = new AuthService(prisma, bcryptUtils);
const controller = new AuthController(service);

router.post("/sign-up", controller.signUp.bind(controller));
router.post("/sign-in", controller.signIn.bind(controller));

export default router;
