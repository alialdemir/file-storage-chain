import formatDistance from 'date-fns/formatDistance'
import subDays from 'date-fns/subDays'

import Chip from '@mui/material/Chip'
import TableCell from '@mui/material/TableCell'
import { IOrganizationItem } from 'src/types/organization'
import TableRow from '@mui/material/TableRow'

type Props = {
  row: IOrganizationItem
}

export default function OrganizationTableRow({ row }: Props) {
  const { name, id, did, messages, created } = row
  const createdDateDistance = formatDistance(subDays(new Date(), 0), new Date(created), {
    addSuffix: true,
  })

  return (
    <TableRow hover>
      <TableCell sx={{ whiteSpace: 'nowrap' }}>{name}</TableCell>

      <TableCell sx={{ whiteSpace: 'nowrap' }}>
        <Chip label={id} size="small" variant="soft" style={{ width: 110 }} />
      </TableCell>

      <TableCell sx={{ whiteSpace: 'nowrap' }}>
        <Chip label={did} size="small" variant="soft" style={{ width: 110 }} />
      </TableCell>

      <TableCell sx={{ whiteSpace: 'nowrap' }}>
        <Chip label={messages.claim} size="small" variant="soft" style={{ width: 110 }} />
      </TableCell>

      <TableCell sx={{ whiteSpace: 'nowrap' }}>{createdDateDistance}</TableCell>
    </TableRow>
  )
}
