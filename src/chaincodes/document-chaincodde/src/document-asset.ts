import { Object, Property } from 'fabric-contract-api'
import { SharedUser } from './models/shared-user.model'

@Object()
export class DocumentAsset {
  @Property()
  public documentId: string

  @Property()
  public documentType?: string

  @Property()
  public size: number

  @Property()
  public name: number

  @Property()
  public url: number

  @Property()
  public userId: string

  @Property()
  public tags?: string[]

  @Property()
  public parentFolderId?: string

  @Property()
  public createdDate: Date

  @Property()
  public modifiedDate: Date

  @Property()
  public isStar: boolean

  @Property()
  public sharedUsers?: SharedUser[]
}
