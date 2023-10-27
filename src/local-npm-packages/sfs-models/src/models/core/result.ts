import { ResultStatus, ValidationSeverity } from '../../enums'
import isEnum from '../../utils/is-enum'
import ValidationError from './validation-error'

export default class Result<T> {
  public status: ResultStatus = ResultStatus.Ok

  public isSuccess: boolean = this.status === ResultStatus.Ok

  successMessage? = ''

  public errors?: string[] = []

  public validationErrors?: ValidationError[] = []

  public data: T = null

  constructor(data: any | ResultStatus) {
    if (isEnum(data, ResultStatus)) {
      this.status = <ResultStatus>data
    } else {
      this.data = <T>data
    }

    this.isSuccess = this.status === ResultStatus.Ok
  }

  /**
   * Represents a successful operation and accepts a datas as the result of the operation
   * @param data Sets the data property
   * @param successMessage Sets the SuccessMessage property
   * @returns Result instance
   */
  public static success<T>(data?: T, successMessage?: string): Result<T> {
    const result = new Result<T>(data)
    if (successMessage) {
      result.successMessage = successMessage
    }

    return result
  }

  /**
   * Represents an error that occurred during the execution of the service.
   * Error messages may be provided and will be exposed via the Errors property.
   * @param errorMessages A list of string error messages.
   * @returns Result instance
   */
  public static error<T>(errorMessages: string): Result<T>
  public static error<T>(errorMessages: string[]): Result<T>
  public static error<T>(errorMessages: any): Result<T> {
    const result = new Result<T>(ResultStatus.Error)
    if (Array.isArray(errorMessages)) {
      result.errors = errorMessages
    } else if (typeof errorMessages === 'string') {
      result.errors = [errorMessages]
    }

    return result
  }

  /**
   * Represents validation errors that prevent the underlying service from completing.
   * @param error A list of validation errors encountered
   */
  // public static invalid<T>(error: ValidationError[])
  /**
   *
   * @param error A string of validation error encountered
   * @param identifier Property name with validation error
   * @returns Result instance
   */
  // public static invalid<T>(error: string[]): Result<T>
  public static invalid<T>(error: any, identifier?: string): Result<T> {
    const result = new Result<T>(ResultStatus.Invalid)
    if (Array.isArray(error)) {
      result.validationErrors = error
    }

    if (typeof error === 'string' && identifier) {
      const validationError: ValidationError = {
        errorMessage: <string>error,
        identifier: identifier,
        severity: ValidationSeverity.Error,
      }

      result.validationErrors = [validationError]
    }

    return result
  }

  /**
   * Represents the situation where a service was unable to find a requested resource.
   * @returns Result instance
   */
  public static notFound<T>(): Result<T> {
    const result = new Result<T>(ResultStatus.NotFound)

    result.errors.push('Record not found!')

    return result
  }

  /**
   * The parameters to the call were correct, but the user does not have permission to perform some action.
   * See also HTTP 403 Forbidden: https://en.wikipedia.org/wiki/List_of_HTTP_status_codes#4xx_client_errors
   * @returns Result instance
   */
  public static forbidden<T>(): Result<T> {
    return new Result<T>(ResultStatus.Forbidden)
  }

  /**
   * This is similar to Forbidden, but should be used when the user has not authenticated or has attempted to authenticate but failed.
   * See also HTTP 401 Unauthorized: https://en.wikipedia.org/wiki/List_of_HTTP_status_codes#4xx_client_errors
   * @returns Result instance
   */
  public static unauthorized<T>(): Result<T> {
    return new Result<T>(ResultStatus.Unauthorized)
  }
}
