const ROOTS = {
  AUTH: '/auth',
  NAMESPACES: '/namespaces',
}

export const paths = {
  // AUTH
  auth: {
    jwt: {
      login: `${ROOTS.AUTH}/jwt/login`,
      register: `${ROOTS.AUTH}/jwt/register`,
    },
  },
  // NAMESPACES
  namespaces: {
    root: ROOTS.NAMESPACES,
    network: {
      organizations: `${ROOTS.NAMESPACES}/network/organizations`,
      nodes: `${ROOTS.NAMESPACES}/network/nodes`,
      identities: `${ROOTS.NAMESPACES}/network/identities`,
      namespaces: `${ROOTS.NAMESPACES}/network/namespaces`,
    },
  },
}

export const apiPaths = {
  apiPrefix: '/api/v1',
  nsPrefix: '/api/v1/namespaces',

  // Network
  networkOrgs: '/network/organizations',
}
