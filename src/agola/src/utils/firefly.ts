import FireFly from '@hyperledger/firefly-sdk'

import { FIREFLY_API } from 'src/config-global'

import { defaultNamespace } from './axios'

const firefly = new FireFly({ host: FIREFLY_API, namespace: defaultNamespace })
export default firefly
