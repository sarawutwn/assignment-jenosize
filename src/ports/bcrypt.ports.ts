export interface BcryptServicePorts {
  encryptPassword(password: string): Promise<string>;
  getToken(payload: any): Promise<string>;
  verifyPassword(password: string, hash: string): Promise<boolean>;
  validatePassword(password: string): { isValid: boolean; errors: string[] };
}
