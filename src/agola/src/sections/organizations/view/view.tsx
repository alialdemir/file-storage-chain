'use client'
import isEqual from 'lodash/isEqual'
import { useState, useCallback } from 'react'
import Card from '@mui/material/Card'
import Table from '@mui/material/Table'
import Button from '@mui/material/Button'
import {} from '@mui/material/styles'
import Container from '@mui/material/Container'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import { paths } from 'src/routes/paths'
import {} from 'src/routes/hooks'
import { RouterLink } from 'src/routes/components'
import {} from 'src/hooks/use-boolean'
import Iconify from 'src/components/iconify'
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
} from 'src/components/table'
import {
  IOrganizationItem,
  IOrganizationTableFilters,
  IOrganizationTableFilterValue,
} from 'src/types/organization'
import OrganizationTableRow from '../organization-table-row'
import OrganizationTableFiltersResult from '../organization-table-filters-result'

const TABLE_HEAD = [
  { id: 'name', label: 'Name', width: 185 },
  { id: 'orgId', label: 'Org Id', width: 150 },
  { id: 'identity', label: 'Identity', width: 150 },
  { id: 'messageId', label: 'Message Id', width: 150 },
  { id: 'Joined', label: 'Joined', width: 185 },
]

const defaultFilters: IOrganizationTableFilters = {
  name: '',
  role: [],
  status: 'all',
}

export default function OrganizationsView() {
  const table = useTable()

  const settings = useSettingsContext()

  const [tableData] = useState([
    {
      id: 'b172d71e-55a8-46da-b462-2bc1ca1338db',
      did: 'did:firefly:org/org_12e729',
      type: 'org',
      namespace: 'default',
      name: 'org_12e729',
      messages: {
        claim: 'db352e4e-6465-44bd-8a9b-422e7a393ae4',
        verification: null,
        update: null,
      },
      created: '2023-10-23T21:15:57.09478194Z',
      updated: '2023-10-23T21:15:57.09478194Z',
    },
    {
      id: '5dd8345a-938a-4bbb-ab84-8eeece7a9ab8',
      did: 'did:firefly:org/org_396202',
      type: 'org',
      namespace: 'default',
      name: 'org_396202',
      messages: {
        claim: 'dbce3e54-ffa0-4f0c-8e96-0af5ccc0632b',
        verification: null,
        update: null,
      },
      created: '2023-10-23T21:16:04.982766675Z',
      updated: '2023-10-23T21:16:04.982766675Z',
    },
  ])

  const [filters, setFilters] = useState(defaultFilters)

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
    filters,
  })

  const canReset = !isEqual(defaultFilters, filters)

  const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length

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
          action={
            <Button
              component={RouterLink}
              href={'paths.dashboard.network.organization.new'}
              variant="contained"
              color="success"
              startIcon={<Iconify icon="mingcute:add-line" />}
            >
              New Organization
            </Button>
          }
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
                  {dataFiltered
                    .slice(
                      table.page * table.rowsPerPage,
                      table.page * table.rowsPerPage + table.rowsPerPage
                    )
                    .map((row) => (
                      <OrganizationTableRow key={row.id} row={row} />
                    ))}

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
  const { name, status, role } = filters

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
