import { Group, Link, List, Select, Style, TextInput } from '@makeswift/runtime/controls'
import { runtime } from 'lib/makeswift/runtime'

import { Navigation } from './client'

export const NAVIGATION_COMPONENT_TYPE = 'makeswift-navigation'

const links = List({
  label: 'Navigation Links',
  type: Group({
    label: 'Link',
    props: {
      label: TextInput({ label: 'Text', defaultValue: 'Home' }),
      link: Link({ label: 'URL' }),
    },
  }),
  getItemLabel: item => item?.label ?? 'Link',
})

const alignment = Select({
  label: 'Alignment',
  options: [
    { value: 'left', label: 'Left' },
    { value: 'center', label: 'Center' },
    { value: 'right', label: 'Right' },
  ],
  defaultValue: 'left',
})

const orientation = Select({
  label: 'Orientation',
  options: [
    { value: 'horizontal', label: 'Horizontal' },
    { value: 'vertical', label: 'Vertical' },
  ],
  defaultValue: 'horizontal',
})

runtime.registerComponent(Navigation, {
  type: NAVIGATION_COMPONENT_TYPE,
  label: 'Navigation',
  icon: 'navigation',
  hidden: true,
  props: {
    className: Style(),
    links,
    alignment,
    orientation,
  },
})
