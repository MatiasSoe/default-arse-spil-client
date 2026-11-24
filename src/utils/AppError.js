/** En domæne-/appikationsfejl med status til HTTP-grænsen.
 * Bruges i service; selve modellen og repository kender ikke HTTP.
 */
class AppError extends Error {
    constructor(message, status = 500) { super(message); this.name = 'AppError'; this.status = status; }
}

module.exports = AppError;
