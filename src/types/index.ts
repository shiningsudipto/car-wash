export interface ErrorMessage {
  path: string;
  message: string;
}

export interface ErrorResponse {
  status: number;
  data: {
    success: boolean;
    message: string;
    errorMessages: ErrorMessage[];
  };
}
