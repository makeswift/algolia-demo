import { lazy } from 'react'

import { Style } from '@makeswift/runtime/controls'
import { runtime } from 'lib/makeswift/runtime'

runtime.registerComponent(
  lazy(() => import('./AlgoliaSearch')),
  {
    type: 'AlgoliaSearch',
    label: 'Algolia Search',
    props: {
      className: Style(),
    },
  }
)
