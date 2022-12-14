import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Dropdown } from '../../internal'

export default {
  title: 'Input/Dropdown',
  component: Dropdown,
} as ComponentMeta<typeof Dropdown>


const Template: ComponentStory<typeof Dropdown> = args => 
  <Dropdown {...args} />
  

export const Options = Template.bind({})
Options.args = {
  options: [
    {
      icon: 'ellipsis-vertical',
      iconPrefix: 'fas',
      dropDownOptions: [
        {
          icon: 'heart',
          text: 'Save'
        },
        {
          icon: 'paper-plane',
          text: 'Send'
        },
        {
          icon: 'plus',
          iconPrefix: 'fas',
          text: 'Add'
        }
      ]
    }
  ]
}