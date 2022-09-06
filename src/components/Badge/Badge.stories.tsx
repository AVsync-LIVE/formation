import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Badge } from '../../internal'
import { Icon } from '../../internal'

export default {
  title: 'Displays/Badge',
  component: Badge,
} as ComponentMeta<typeof Badge>

const Template: ComponentStory<typeof Badge> = (args) => <Badge {...args} />

export const Regular = Template.bind({})
Regular.args = {
  colorString: 'red'
}
