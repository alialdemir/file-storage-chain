'use client'

import Container from '@mui/material/Container'

import { useSettingsContext } from 'src/components/settings'

export default function OrganizationsView() {
  const settings = useSettingsContext()

  return <Container maxWidth={settings.themeStretch ? false : 'lg'}>home</Container>
}
