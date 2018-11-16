class NotFoundError extends Error {
  constructor(entityName, entityId, status) {
    super(entityName);
    this.name = 'NotFoundError';
    this.errorMessage = `${entityName} with id: ${entityId} not found.`;
    this.status = status || 404;
  }
}

module.exports = NotFoundError;
