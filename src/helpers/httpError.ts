export class HttpError extends Error {
  statusCode: number

  constructor(status: number, ...params: ConstructorParameters<typeof Error>) {
    super(...params)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, HttpError)
    }

    this.statusCode = status
  }
}
