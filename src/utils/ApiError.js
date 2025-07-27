class ApiError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.message = message || "An error occurred";
    this.statusCode = statusCode;
    this.isOperational = true; // This helps to distinguish between operational errors and programming errors
  }
}

export default ApiError;
