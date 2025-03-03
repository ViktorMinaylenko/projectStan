class ApiError extends Error {
	constructor(status, message) {
		super()
		this.status = status
		this.message = message
	}

	static badRequest(message) {
		return new ApiError(400, message)
	}

	static unauthorized(message) {
		return new ApiError(401, message)
	}

	static forbidden(message) {
		return new ApiError(403, message)
	}

	static notFound(message) {
		return new ApiError(404, message)
	}

	static methodNotAllowed(message) {
		return new ApiError(405, message)
	}

	static conflict(message) {
		return new ApiError(409, message)
	}

	static tooManyRequests(message) {
		return new ApiError(429, message)
	}

	static internal(message) {
		return new ApiError(500, message)
	}

	static serviceUnavailable(message) {
		return new ApiError(503, message)
	}
}

module.exports = ApiError
