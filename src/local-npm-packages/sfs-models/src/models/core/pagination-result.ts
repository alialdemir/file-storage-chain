import { ResultStatus } from '../../enums'
import Cursors from './cursors'
import Result from './result'

export default class PaginationResult<T> extends Result<T> {
  constructor(value: any | ResultStatus) {
    super(value)
  }

  public static toPagedResult<T>(
    value: T,
    fetchedRecordsCount: number,
    afterbookmark?: string,
    beforeBookmark?: string,
  ): PaginationResult<T> {
    const paginationResult = new PaginationResult<T>(value)
    paginationResult.fetchedRecordsCount = fetchedRecordsCount
    paginationResult.cursors = {
      after: afterbookmark,
      before: beforeBookmark,
    }

    return paginationResult
  }

  public fetchedRecordsCount: number

  public cursors: Cursors
}
