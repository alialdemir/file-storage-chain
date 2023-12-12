import { Context, Info, Transaction } from 'fabric-contract-api'
import { ContractBase } from './core/base'
import utils from './core/helpers/iterator'
import { PaginationResult, Result } from 'sfs-models'

/**
 * - create file upload and send ipfs
 * Get files bu user id and name, doc type, created date, parent folder id search
 * - Delete file and folder
 */
@Info({
  title: 'Document contract',
  description: 'Smart contract for document',
})
export class DocumentContract extends ContractBase {
  // @Transaction()
  // // @Returns('object')
  // public async uploadDocument(ctx: Context, args: string): Promise<any> {
  //   if (!isJsonString(args)) {
  //     return Result.error('Args is not json')
  //   }

  //   const document: DocumentAsset = JSON.parse(args)
  //   const exists = await this.documentAssetExits(ctx, document.documentId)
  //   if (exists) {
  //     Result.error(`The asset ${document.documentId} already exists`)
  //   }

  //   const documentValues = Object.values(document)

  //   document.documentId = ctx.stub.createCompositeKey(
  //     `${ctx.clientIdentity.getMSPID()}-${document.userId}`,
  //     documentValues
  //   )

  //   document.createdDate = new Date()

  //   // TODO: Send file ipfs

  //   await ctx.stub.putState(
  //     document.documentId,
  //     Buffer.from(stringify(sortKeysRecursive(document)))
  //   )

  //   ctx.stub.setEvent('uploadDocument', Buffer.from(document))

  //   return Result.success('Upload document successful!')
  // }

  // @Transaction()
  // // @Returns('object')
  // public async deleteDocument(ctx: Context, documentId: string): Promise<any> {
  //   const exists = await this.documentAssetExits(ctx, documentId)
  //   if (!exists) {
  //     Result.error(`The asset ${documentId} does not exist`)
  //   }

  //   await ctx.stub.deleteState(documentId)

  //   return Result.success('Delete successful!')
  // }

  // @Transaction()
  // // @Returns('object')
  // public async updateDocument(ctx: Context, args: string): Promise<any> {
  //   if (!isJsonString(args)) {
  //     return Result.error('Args is not json')
  //   }

  //   const document: DocumentAsset = JSON.parse(args)
  //   const exists = await this.documentAssetExits(ctx, document.documentId)
  //   if (!exists) {
  //     Result.error(`The asset ${document.documentId} does not exist`)
  //   }

  //   await ctx.stub.putState(
  //     document.documentId,
  //     Buffer.from(stringify(sortKeysRecursive(document)))
  //   )

  //   ctx.stub.setEvent('updateDocument', Buffer.from(document))

  //   return Result.success('Update document successful!')
  // }

  // private async documentAssetExits(ctx: Context, id: string): Promise<boolean> {
  //   const assetJSON = await ctx.stub.getState(id)
  //   return assetJSON && assetJSON.length > 0
  // }

  @Transaction(false)
  public async getDocumentByUserId(ctx: Context): Promise<any> {
    // if (!isJsonString(args)) {
    //   return JSON.stringify(Result.error('Args is not json'))
    // }

    const filter: any = {} //JSON.parse(args)

    const query = {
      selector: {
        // userId: filter.userId,
      },
      limit: filter.pageSize || 100,
    }

    // if (isString(filter.documentName)) {
    //   query.selector['name'] = {
    //     $regex: filter.documentName,
    //   }
    // }

    // if (isString(filter.documentType)) {
    //   query.selector['documentType'] = filter.documentType
    // }

    // if (isString(filter.parentFolderId)) {
    //   query.selector['parentFolderId'] = filter.parentFolderId
    // }

    // if (isString(filter.startDate) && isString(filter.endDate)) {
    //   query.selector['createdDate'] = {
    //     $gte: filter.startDate,
    //     $lt: filter.endDate,
    //   }
    // }

    const resultsIterator = await ctx.stub.getQueryResultWithPagination(
      JSON.stringify(query),
      filter.pageSize,
      filter.bookmark
    )
    const documentJson = await utils.GetAllResults(resultsIterator.iterator)

    const { fetchedRecordsCount, bookmark } = resultsIterator.metadata
    return JSON.stringify(
      Result.success(
        PaginationResult.toPagedResult(documentJson, fetchedRecordsCount, bookmark, filter.bookmark)
      )
    )
  }
}
