import { useMemo } from 'react'
import { paths } from 'src/routes/paths'
import SvgColor from 'src/components/svg-color'
import { LanguageIcon, DashboardIcon } from 'src/assets/icons'
const icon = (name: string) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
  // OR
  // <Iconify icon="fluent:mail-24-filled" />
  // https://icon-sets.iconify.design/solar/
  // https://www.streamlinehq.com/icons
)

const ICONS = {
  language: <LanguageIcon />,
  dashboard: <DashboardIcon />,
}

export function useNavData() {
  const data = useMemo(
    () => [
      // OVERVIEW

      {
        subheader: 'File Storage Chain',
        items: [{ title: 'Dashboard', path: paths.namespaces.root, icon: ICONS.dashboard }],
      },

      // Network<

      {
        items: [
          {
            title: 'Network',
            icon: ICONS.language,
            path: paths.namespaces.network.organizations,
            children: [
              { title: 'Organizations', path: paths.namespaces.network.organizations },
              { title: 'Nodes', path: paths.namespaces.network.nodes },
              { title: 'Identities', path: paths.namespaces.network.identities },
              { title: 'Namespaces', path: paths.namespaces.network.namespaces },
            ],
          },
        ],
      },
    ],
    []
  )

  return data
}
