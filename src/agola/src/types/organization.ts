export type IOrganizationTableFilterValue = string | string[]

export type IOrganizationTableFilters = {
  name: string
  role: string[]
  status: string
}
export type IOrganizationItem = {
  id: string
  did: string
  type: string
  namespace: string
  name: string
  messages: IOrganizationMessages
  created: string
  updated: string
}

export type IOrganizationMessages = {
  claim: string
  verification: any
  update: any
}
