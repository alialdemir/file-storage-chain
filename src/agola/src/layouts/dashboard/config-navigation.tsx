import { useMemo } from 'react'

import { paths } from 'src/routes/paths'

import { FolderIcon, LanguageIcon, DashboardIcon } from 'src/assets/icons'

const ICONS = {
  language: <LanguageIcon />,
  dashboard: <DashboardIcon />,
  folder: <FolderIcon />,
}

export function useNavData() {
  const data = useMemo(
    () => [
      // OVERVIEW
      {
        subheader: 'File Storage Chain',
        items: [
          { title: 'Dashboard', path: paths.ROOT.root, icon: ICONS.dashboard },
          { title: 'File Manager', path: paths.ROOT.fileManager, icon: ICONS.folder },
        ],
      },

      // Network
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
