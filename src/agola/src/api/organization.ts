import useSWR from 'swr'
import { useMemo } from 'react'
import { defaultNamespace, endpoints, fetcher } from 'src/utils/axios'
import { IOrganizationItem } from 'src/types/organization'
import { IRequestParams } from 'src/types/global'

export function useGetOrganizations(params: IRequestParams) {
  const URL = `${endpoints.nsPrefix}/${defaultNamespace}/${endpoints.networkOrgs}?limit=${params.limit}&count&skip=${params.skip}&sort=created`

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher)

  const memoizedValue = useMemo(
    () => ({
      organizations: (data?.items as IOrganizationItem[]) || [],
      organizationsLoading: isLoading,
      organizationsError: error,
      organizationsValidating: isValidating,
      organizationsEmpty: !isLoading && !data?.items.length,
    }),
    [data?.items, error, isLoading, isValidating]
  )

  return memoizedValue
}
