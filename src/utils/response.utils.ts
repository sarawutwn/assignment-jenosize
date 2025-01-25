export class ResponseUtils {
  successResponse(status: number, message: string, result: any) {
    return {
      status,
      message,
      result,
    };
  }

  errorResponse(status: number, error: any) {
    return {
      status,
      error,
    };
  }
}
