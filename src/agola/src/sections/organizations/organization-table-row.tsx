import Chip from '@mui/material/Chip'
import TableCell from '@mui/material/TableCell'
import { IOrganizationItem } from 'src/types/organization'
import TableRow from '@mui/material/TableRow'
import { fToNow } from 'src/utils/format-time'

type Props = {
  row: IOrganizationItem
}

export default function OrganizationTableRow({ row }: Props) {
  const { name, id, did, messages, created } = row
  const createdDateDistance = fToNow(created)

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
