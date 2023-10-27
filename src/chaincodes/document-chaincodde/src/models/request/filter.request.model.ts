export default class FilterRequest {
  public pageSize: number

  public bookmark?: string

  public startDate?: Date

  public endDate?: Date

  public documentName?: string

  public userId: string

  public documentType?: string

  public parentFolderId?: string
}
