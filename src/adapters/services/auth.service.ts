import type { PrismaClient } from "@prisma/client";
import type { BcryptUtils } from "../../utils/bcrypt.utils";
import type { AuthServicePorts } from "../../ports/auth/auth.ports";

export class AuthService implements AuthServicePorts {
  constructor(private prisma: PrismaClient, private bcrypt: BcryptUtils) {}

  async signIn(username: string, password: string): Promise<{ error: boolean; result: string }> {
    const user = await this.prisma.users.findUnique({
      where: { user_username: username },
      select: { user_id: true, user_username: true, user_password: true, user_filed_stamp: true, status: true },
    });
    if (!user) {
      return { error: true, result: "Invalid user!" };
    }
    if (!user.status) {
      return { error: true, result: "Account is locked!" };
    }
    if (user.user_filed_stamp >= 3) {
      return { error: true, result: "Account is locked!" };
    }
    if (!(await this.bcrypt.verifyPassword(password, user.user_password))) {
      await this.prisma.users.update({ where: { user_id: user.user_id }, data: { user_filed_stamp: { increment: 1 } } });
      return { error: true, result: "Password is not compare!" };
    }
    const token = await this.bcrypt.getToken({ user_id: user.user_id, username: user.user_username });
    await this.prisma.users.update({ where: { user_id: user.user_id }, data: { user_filed_stamp: 0 } });
    return { error: false, result: token };
  }

  async signUp(username: string, password: string, fullname: string): Promise<{ error: boolean; message: string }> {
    // เช็ค username ว่าเคยสมัครหรือเปล่า
    const oldUser = await this.prisma.users.findUnique({ where: { user_username: username }, select: { user_id: true } });
    if (oldUser) {
      return { error: true, message: "User Already has!" };
    }

    // เช็ค password ว่ายากพอหรือเปล่า
    const validatePassword = await this.bcrypt.validatePassword(password);
    if (!validatePassword.isValid) {
      return { error: true, message: "Password isn't strong!" };
    }

    // เข้ารหัส password
    const hashPassword = await this.bcrypt.encryptPassword(password);
    // บันทึกลง database
    await this.prisma.users.create({
      data: {
        user_fullname: fullname,
        user_username: username,
        user_password: hashPassword,
      },
      select: {
        user_id: true,
      },
    });

    return { error: false, message: "Signup successfully." };
  }
}
