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

export interface TSlot {
  _id: string;
  service: string;
  date: string;
  startTime: string;
  endTime: string;
  isBooked: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
}

export interface TService {
  _id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface TReview {
  _id: string;
  email: string;
  name: string;
  rating: number;
  feedback: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// api error

export interface TErrorMessage {
  path: string;
  message: string;
}

export interface TErrorData {
  success: boolean;
  message: string;
  errorMessages: TErrorMessage[];
}

export interface TApiError {
  status: number;
  data: TErrorData;
}
