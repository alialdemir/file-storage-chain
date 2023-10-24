'use client'
import { Props } from 'simplebar-react'
import { FilterContext } from './filter-context'
import { useEffect, useState } from 'react'
import { ITimeFilterObject, TimeFilterEnum, getTimeFilterObject } from 'src/types/filter'
import { useSearchParams, usePathname } from 'src/routes/hooks'

export const FILTERS_QUERY_KEY = 'filters'
export const SLIDE_QUERY_KEY = 'slide'
export const TIME_QUERY_KEY = 'time'

export function FilterProvider({ children }: Props) {
  const pathname = usePathname()
  // const [search] = useState(router.query)

  const [filterAnchor, setFilterAnchor] = useState<HTMLButtonElement | null>(null)
  const searchParams = useSearchParams()
  // Table filters
  const [filterArray, setFilterArray] = useState<string[]>([])
  const [filterString, setFilterString] = useState('')
  const [slideID, setSlideID] = useState<string | null>(null)
  // Date filter
  const [dateFilter, setDateFilter] = useState<ITimeFilterObject>()

  useEffect(() => {
    initializeTimeSearchParams()
    initializeSlideSearchParams()
    initializeTableFilterSearchParams()
  }, [pathname /*search*/])

  // useEffect(() => {
  //   clearNewEvents()
  // }, [pathname])

  const initializeTimeSearchParams = () => {
    // If date has already been set
    if (dateFilter?.filterShortString && dateFilter?.filterShortString in TimeFilterEnum) {
      setTimeSearchParam(dateFilter.filterShortString)
      return
    }
    // If time param is invalid
    const existingTimeParam = searchParams.get(TIME_QUERY_KEY)
    if (existingTimeParam === null || !(existingTimeParam in TimeFilterEnum)) {
      setTimeSearchParam(TimeFilterEnum['24hours'])
    } else {
      // Set filter string for components to consume
      setDateFilter(getTimeFilterObject(existingTimeParam as TimeFilterEnum))
    }
  }

  const setTimeSearchParam = (timeFilter: TimeFilterEnum) => {
    searchParams.set(TIME_QUERY_KEY, timeFilter)
    setSearchParams(searchParams, { replace: true })
    if (getTimeFilterObject(timeFilter).filterShortString !== dateFilter?.filterShortString) {
      setDateFilter(getTimeFilterObject(timeFilter))
    }
  }

  const initializeSlideSearchParams = () => {
    setSlideID(null)
    const existingSlideParam = searchParams.get(SLIDE_QUERY_KEY)
    if (existingSlideParam === null) {
      setSlideSearchParam(null)
    } else {
      setSlideSearchParam(existingSlideParam)
    }
  }

  const setSlideSearchParam = (slideID: string | null) => {
    if (slideID === null) {
      searchParams.delete(SLIDE_QUERY_KEY)
      setSearchParams(searchParams, { replace: true })
    } else {
      searchParams.set(SLIDE_QUERY_KEY, slideID)
      setSearchParams(searchParams, { replace: true })
      setSlideID(slideID)
    }
  }

  const initializeTableFilterSearchParams = () => {
    const existingFilterArray = searchParams.getAll(FILTERS_QUERY_KEY)
    setFilterArray(existingFilterArray)
    setFilterString(`&${existingFilterArray.join('&')}`)
  }

  const addFilterToParams = (filter: string) => {
    searchParams.append(FILTERS_QUERY_KEY, filter)
    setSearchParams(searchParams, { replace: true })
    const filterArray = searchParams.getAll(FILTERS_QUERY_KEY)
    setFilterArray(filterArray)
    setFilterString(`&${filterArray.join('&')}`)
  }

  const clearAllFilters = () => {
    searchParams.delete(FILTERS_QUERY_KEY)
    setSearchParams(searchParams, { replace: true })
    setFilterArray([])
    setFilterString('')
  }

  const removeFilter = (filterToRemove: string) => {
    const filters = searchParams.getAll(FILTERS_QUERY_KEY)
    searchParams.delete(FILTERS_QUERY_KEY)
    if (filters.length > 0) {
      filters.forEach((f: any) => {
        if (f !== filterToRemove) {
          searchParams.append(FILTERS_QUERY_KEY, f)
        }
      })
      setSearchParams(searchParams, { replace: true })
      const filterArray = searchParams.getAll(FILTERS_QUERY_KEY)
      setFilterArray(filterArray)
      setFilterString(`&${filterArray.join('&')}`)
    }
  }

  return (
    <FilterContext.Provider
      value={{
        filterAnchor,
        setFilterAnchor,
        filterString,
        filterArray,
        addFilterToParams,
        removeFilter,
        clearAllFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  )
}
