class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
    this.errorMessage = message;
    this.status = 400;
  }
}

module.exports = ValidationError;
