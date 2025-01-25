import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import type { BcryptServicePorts } from "../../ports/bcrypt.ports";

export class BcryptUtils implements BcryptServicePorts {
  private SECRET_KEY = Bun.env.SERVER_SECRET_KEY || "";
  private saltRounds = 10;

  async encryptPassword(password: string): Promise<string> {
    const hash = await bcrypt.hash(password, this.saltRounds);
    return hash;
  }

  async getToken(payload: any): Promise<string> {
    return jwt.sign(payload, this.SECRET_KEY, { expiresIn: "24h" });
  }

  async verifyPassword(password: string, hash: string): Promise<boolean> {
    const isMatch = await bcrypt.compare(password, hash);
    return isMatch;
  }

  validatePassword(password: string): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];
    if (password.length < 8) {
      errors.push("Password must be at least 8 characters long");
    }
    // ตัวพิมพ์เล็กอย่างน้อย 1 อักษร
    if (!/[a-z]/.test(password)) {
      errors.push("Password must contain at least one lowercase letter");
    }

    // ตัวพิมพ์ใหญ่อย่างน้อย 1 อักษร
    if (!/[A-Z]/.test(password)) {
      errors.push("Password must contain at least one uppercase letter");
    }

    // ตัวเลขอย่างน้อย 1 อักษร
    if (!/\d/.test(password)) {
      errors.push("Password must contain at least one number");
    }

    // สัญลักษณ์อย่างน้อย 1 อักษร
    if (!/[@$!%*?&]/.test(password)) {
      errors.push("Password must contain at least one special character (@$!%*?&)");
    }
    const isValid = errors.length === 0;
    return { isValid, errors };
  }
}
