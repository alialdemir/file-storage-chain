import { useMemo } from 'react'
import { IOrganizationItem } from 'src/types/organization'
import { IRequestParams } from 'src/types/global'
import firefly from 'src/utils/firefly'
import useSWR from 'swr'
import { FireFlyOrganizationFilter } from '@hyperledger/firefly-sdk'

export function useGetOrganizations(params: IRequestParams) {
  const filter = {
    limit: params.limit,
    skip: params.skip,
  } as FireFlyOrganizationFilter

  const { data, isLoading, error, isValidating } = useSWR(filter, (filter) =>
    firefly.getOrganizations(filter)
  )

  const memoizedValue = useMemo(
    () => ({
      organizations: (data as IOrganizationItem[]) || [],
      organizationsLoading: isLoading,
      organizationsError: error,
      organizationsValidating: isValidating,
      organizationsEmpty: !isLoading && !data?.length,
    }),
    [data?.length, error, isLoading, isValidating]
  )

  return memoizedValue
}
