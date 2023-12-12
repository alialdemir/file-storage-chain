import useSWR from 'swr'
import { useMemo } from 'react'
import { FireFlyOrganizationFilter } from '@hyperledger/firefly-sdk'

import firefly from 'src/utils/firefly'

import { IRequestParams } from 'src/types/global'
import { IOrganizationItem } from 'src/types/organization'

export function useGetOrganizations(params: IRequestParams) {
  const filter: FireFlyOrganizationFilter = {
    limit: params.limit.toString(),
    skip: params.skip.toString(),
  }

  // const dosyaAdi = './organization.ts' // Okunacak dosyanın adını buraya girin
  // document.getElementById('dosyaOku')?.addEventListener('click', () => {
  //   const dosyaSecimi = document.getElementById('dosyaSecimi')
  //   const dosyaIcerik = document.getElementById('dosyaIcerik')

  //   const secilenDosya = dosyaSecimi.files[0]
  //   if (!secilenDosya) {
  //     dosyaIcerik.innerText = 'Dosya seçilmedi.'
  //     return
  //   }

  //   const dosyaOkuyucu = new FileReader()

  //   dosyaOkuyucu.onload = function (event) {
  //     dosyaIcerik.innerText = event.target.result
  //     // console.log(new Uint8Array(this.result))

  //     firefly.uploadData({
  //       value: new Uint8Array(this.result),
  //     })
  //   }

  //   dosyaOkuyucu.readAsText(secilenDosya)
  // })

  // firefly.sendBroadcast({
  //   data: [
  //     {
  //       value: 'test-message',
  //     },
  //   ],
  // })

  // firefly.invokeContractAPI('document', 'uploadDocument', {
  //   input: {
  //     args: JSON.stringify({ userId: '1', name: 'doc1' }),
  //   },
  //   options: {},
  // })

  firefly.queryContract({
    input: {
      args: "{ 'userId': '1' }",
    },
    interface: '4d5a15c4-c720-428f-ba9a-e23492f4489c',
    method: {
      name: 'getDocumentByUserId',
    },
    methodPath: 'getDocumentByUserId',
    location: {
      channel: 'document',
      chaincode: 'document',
    },
  })
  // firefly.getContractAPIs()
  const { data, isLoading, error, isValidating } = useSWR(filter, (filterData) =>
    firefly.getOrganizations(filterData)
  )

  const memoizedValue = useMemo(
    () => ({
      organizations: (data as IOrganizationItem[]) || [],
      organizationsLoading: isLoading,
      organizationsError: error,
      organizationsValidating: isValidating,
      organizationsEmpty: !isLoading && !data?.length,
    }),
    [data, error, isLoading, isValidating]
  )

  return memoizedValue
}
