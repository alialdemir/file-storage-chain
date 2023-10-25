const ROOTS = {
  ROOT: '/app',
  AUTH: '/auth',
  NAMESPACES: '/namespaces',
}

const rootUrlCombine = (url: string) => `${ROOTS.ROOT}/${url}`

export const paths = {
  // AUTH
  auth: {
    jwt: {
      login: `${ROOTS.AUTH}/jwt/login`,
      register: `${ROOTS.AUTH}/jwt/register`,
    },
    // ROOT
  },

  ROOT: {
    root: ROOTS.ROOT,
    fileManager: `${ROOTS.ROOT}/file-manager`,
  },

  // NAMESPACES
  namespaces: {
    network: {
      organizations: `${rootUrlCombine(ROOTS.NAMESPACES)}/network/organizations`,
      nodes: `${rootUrlCombine(ROOTS.NAMESPACES)}/network/nodes`,
      identities: `${rootUrlCombine(ROOTS.NAMESPACES)}/network/identities`,
      namespaces: `${rootUrlCombine(ROOTS.NAMESPACES)}/network/namespaces`,
    },
  },
}

export const apiPaths = {
  apiPrefix: '/api/v1',
  nsPrefix: '/api/v1/namespaces',

  // Network
  networkOrgs: '/network/organizations',
}
