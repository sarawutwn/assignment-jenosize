export interface AuthServicePorts {
  signIn(username: string, password: string): Promise<{ error: boolean, result: string }>;
  signUp(username: string, password: string, fullname: string): Promise<{ error: boolean; message: string }>;
}
