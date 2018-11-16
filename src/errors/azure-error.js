class AzureError extends Error {
  constructor(message) {
    super(message);
    this.name = 'AzureError';
    this.errorMessage = message;
    this.status = 409;
  }
}

module.exports = AzureError;
