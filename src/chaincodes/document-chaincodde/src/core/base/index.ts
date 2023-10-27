import { Contract } from 'fabric-contract-api'
import { Shim } from 'fabric-shim'
import { Result } from 'sfs-models'

export abstract class ContractBase extends Contract {
  protected success<T>(data?: any) {
    const result = JSON.stringify(Result.success(data))
    return Shim.success(Buffer.from(result))
  }

  protected error<T>(data: string) {
    const result = JSON.stringify(Result.error(data))
    return Shim.error(Buffer.from(result))
  }
}
