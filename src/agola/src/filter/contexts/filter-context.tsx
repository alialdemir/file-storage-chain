import { createContext, Dispatch, SetStateAction } from 'react'

export interface IFilterContext {
  filterAnchor: HTMLButtonElement | null
  setFilterAnchor: Dispatch<SetStateAction<HTMLButtonElement | null>>
  filterString: string
  filterArray: string[]
  addFilterToParams: (filter: string) => void
  removeFilter: (filterToRemove: string) => void
  clearAllFilters: () => void
}

export const FilterContext = createContext({} as IFilterContext)
