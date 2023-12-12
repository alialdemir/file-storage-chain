import { snackActions } from 'src/utils/'
import { Result } from 'sfs-models'
import { isArray } from 'lodash'
import axios from 'src/utils/axios'

export type PostParams = {
  url: string
  data: any
}

type ErrorTypes = {
  message: string[] | string
  errors: string[]
  validationErrors: string[]
}

export default class ApiBase {
  static async get(url: string): Promise<Result<any>> {
    try {
      const response = await axios.get(url)
      return response?.data
    } catch (error) {
      ApiBase.errorHandler(error)

      return error
    }
  }

  static async post({ url, data }: PostParams): Promise<Result<any>> {
    try {
      const response = await axios.post(url, data)
      return response?.data
    } catch (error) {
      ApiBase.errorHandler(error)

      return error
    }
  }

  static async delete(url: string): Promise<Result<any>> {
    try {
      const response = await axios.delete(url)
      return response?.data
    } catch (error) {
      ApiBase.errorHandler(error)

      return error
    }
  }

  static async put({ url, data }: PostParams): Promise<Result<any>> {
    try {
      const response = await axios.put(url, data)
      return response?.data
    } catch (error) {
      ApiBase.errorHandler(error)

      return error
    }
  }

  private static errorHandler(error: ErrorTypes): void {
    if (!error) {
      return
    }

    const { errors, validationErrors, message } = error
    if (errors || validationErrors || message) {
      if (errors?.length > 0) {
        errors.forEach((e: string) => snackActions.error(e))
      } else if (validationErrors?.length > 0) {
        validationErrors.forEach((e: any) => snackActions.error(e.errorMessage))
      } else if (message?.length > 0 && isArray(message)) {
        message.forEach((e: string) => snackActions.error(e))
      }
    }

    if (typeof error === 'string' && error !== '') {
      snackActions.error(error)
    } else if (error.message && typeof error.message === 'string') {
      snackActions.error(error.message)
    }
  }
}
