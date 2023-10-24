'use client'
import isEqual from 'lodash/isEqual'
import { useState, useCallback, useEffect } from 'react'
import Card from '@mui/material/Card'
import Table from '@mui/material/Table'
import Container from '@mui/material/Container'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import { paths } from 'src/routes/paths'
import {} from 'src/routes/components'
import Scrollbar from 'src/components/scrollbar'
import { useSettingsContext } from 'src/components/settings'
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs'
import {
  useTable,
  emptyRows,
  TableNoData,
  getComparator,
  TableEmptyRows,
  TableHeadCustom,
  TablePaginationCustom,
  TableSkeleton,
} from 'src/components/table'
import {
  IOrganizationItem,
  IOrganizationTableFilters,
  IOrganizationTableFilterValue,
} from 'src/types/organization'
import OrganizationTableFiltersResult from '../organization-table-filters-result'
import { useGetOrganizations } from 'src/api/organization'
import OrganizationTableRow from '../organization-table-row'

const TABLE_HEAD = [
  { id: 'name', label: 'Name', width: 185 },
  { id: 'orgId', label: 'Org Id', width: 150 },
  { id: 'identity', label: 'Identity', width: 150 },
  { id: 'messageId', label: 'Message Id', width: 150 },
  { id: 'Joined', label: 'Joined', width: 185 },
]

const defaultFilters: IOrganizationTableFilters = {
  name: '',
}

export default function OrganizationsView() {
  const table = useTable()

  const settings = useSettingsContext()
  const { organizations, organizationsLoading, organizationsEmpty } = useGetOrganizations({
    limit: table.rowsPerPage,
    skip: table.rowsPerPage * table.page,
  })

  const [tableData, setTableData] = useState<IOrganizationItem[]>([])

  useEffect(() => {
    if (organizations.length) {
      setTableData(organizations)
    }
  }, [organizations])

  const [filters, setFilters] = useState(defaultFilters)

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
    filters,
  })

  const canReset = !isEqual(defaultFilters, filters)

  const notFound = (!dataFiltered.length && canReset) || organizationsEmpty

  const handleFilters = useCallback(
    (name: string, value: IOrganizationTableFilterValue) => {
      table.onResetPage()
      setFilters((prevState) => ({
        ...prevState,
        [name]: value,
      }))
    },
    [table]
  )

  const handleResetFilters = useCallback(() => {
    setFilters(defaultFilters)
  }, [])

  return (
    <>
      <Container maxWidth={settings.themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Organizations"
          links={[
            { name: 'Namespace', href: paths.namespaces.root },
            { name: 'Network' },
            { name: 'Organizations' },
          ]}
          // action={
          //   <Button
          //     component={RouterLink}
          //     href={'paths.dashboard.network.organization.new'}
          //     variant="contained"
          //     color="success"
          //     startIcon={<Iconify icon="mingcute:add-line" />}
          //   >
          //     New Organization
          //   </Button>
          // }
          sx={{
            mb: { xs: 3, md: 5 },
          }}
        />

        <Card>
          {canReset && (
            <OrganizationTableFiltersResult
              filters={filters}
              onFilters={handleFilters}
              //
              onResetFilters={handleResetFilters}
              //
              results={dataFiltered.length}
              sx={{ p: 2.5, pt: 0 }}
            />
          )}

          <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
            <Scrollbar>
              <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
                <TableHeadCustom
                  order={table.order}
                  orderBy={table.orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={tableData.length}
                  numSelected={table.selected.length}
                  onSort={table.onSort}
                />

                <TableBody>
                  {organizationsLoading ? (
                    [...Array(table.rowsPerPage)].map((i, index) => <TableSkeleton key={index} />)
                  ) : (
                    <>
                      {dataFiltered
                        .slice(
                          table.page * table.rowsPerPage,
                          table.page * table.rowsPerPage + table.rowsPerPage
                        )
                        .map((row) => (
                          <OrganizationTableRow key={row.id} row={row} />
                        ))}
                    </>
                  )}

                  <TableEmptyRows
                    emptyRows={emptyRows(table.page, table.rowsPerPage, tableData.length)}
                  />

                  <TableNoData notFound={notFound} />
                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>

          <TablePaginationCustom
            count={dataFiltered.length}
            page={table.page}
            rowsPerPage={table.rowsPerPage}
            onPageChange={table.onChangePage}
            onRowsPerPageChange={table.onChangeRowsPerPage}
          />
        </Card>
      </Container>
    </>
  )
}

function applyFilter({
  inputData,
  comparator,
  filters,
}: {
  inputData: IOrganizationItem[]
  comparator: (a: any, b: any) => number
  filters: IOrganizationTableFilters
}) {
  const { name } = filters

  const stabilizedThis = inputData.map((el, index) => [el, index] as const)

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) return order
    return a[1] - b[1]
  })

  inputData = stabilizedThis.map((el) => el[0])

  if (name) {
    inputData = inputData.filter(
      (organization) => organization.name.toLowerCase().indexOf(name.toLowerCase()) !== -1
    )
  }

  return inputData
}
