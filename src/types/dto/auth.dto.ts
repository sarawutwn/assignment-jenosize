import { IsString, IsNotEmpty, MinLength, Matches } from "class-validator";

export class SignUpDto {
  @IsString()
  @IsNotEmpty({ message: "Username is required" })
  username!: string;

  @IsString()
  @MinLength(8, { message: "Password must be at least 8 characters long" })
  @Matches(/(?=.*[a-z])/, { message: "Password must contain at least one lowercase letter" }) // มีตัวพิมพ์เล็ก
  @Matches(/(?=.*[A-Z])/, { message: "Password must contain at least one uppercase letter" }) // มีตัวพิมพ์ใหญ่
  @Matches(/(?=.*\d)/, { message: "Password must contain at least one number" }) // มีตัวเลข
  @Matches(/(?=.*[@$!%*?&])/, { message: "Password must contain at least one symbol (@$!%*?&)" }) // มีสัญลักษณ์
  password!: string;

  @IsString()
  @IsNotEmpty({ message: "Fullname is required" })
  fullname!: string;
}

export class SignInDto {
  @IsString()
  @IsNotEmpty({ message: "Username is required" })
  username!: string;

  @IsString()
  @MinLength(8, { message: "Password must be at least 8 characters long" })
  @Matches(/(?=.*[a-z])/, { message: "Password must contain at least one lowercase letter" }) // มีตัวพิมพ์เล็ก
  @Matches(/(?=.*[A-Z])/, { message: "Password must contain at least one uppercase letter" }) // มีตัวพิมพ์ใหญ่
  @Matches(/(?=.*\d)/, { message: "Password must contain at least one number" }) // มีตัวเลข
  @Matches(/(?=.*[@$!%*?&])/, { message: "Password must contain at least one symbol (@$!%*?&)" }) // มีสัญลักษณ์
  password!: string;
}
