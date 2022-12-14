import React from 'react'
import styled from 'styled-components'

import { Gap } from '../../internal'
import { Icon } from '../../internal'

interface Props {
  options: {
    value: string,
    name: string
  }[],
  value: string,
  onChange: (arg0: string) => void
}

export const Radio = ({ options, value, onChange } : Props) => {
  return <Gap>
    {
      options.map((option, index) => 
        <S.OptionContainer 
          active={value === option.value}
          onClick={() => onChange(option.value)}
        >
          <S.OptionSelected>
            <Icon icon={value === option.value ? 'check-square' : 'square'} iconPrefix={'far'} fixedWidth/>
          </S.OptionSelected>
          <S.Option
              
              active={value === option.value}
              key={`option${index}`}
            >
              {
                option.name
              }
          </S.Option> 
        </S.OptionContainer>   
      )
    }
  </Gap>
}

interface OptionContainer {
  active: boolean
}

interface OptionProps {
  active: boolean
}

const S = {
  OptionContainer: styled.div<OptionContainer>`
    width: 100%;
    display: flex;
    background: ${props => props.active ? 'var(--F_Surface_2)' : 'var(--F_Surface)'};
    cursor: pointer;
    border-radius: 8px;

    &:hover {
      background: ${props => props.active ? 'var(--F_Surface_2)' : 'var(--F_Surface_1)'};
    }
    &:active {
      transform: translateY(1px);
    }
  `,
  Option: styled.div<OptionProps>`
    width: 100%;
    color: var(--F_Font_Color);
    color: ${props => props.active ? 'var(--F_Font_Color)' : 'var(--F_Font_Color_Label)'};
    display: flex;
    align-items: center;
    height: var(--Tile_Taskbar_Height);
    font-size: var(--F_Font_Size);
    
  `,
  OptionSelected: styled.div`
    height: var(--F_Input_Height);
    width: var(--F_Input_Height);
    display: flex;
    align-items: center;
    justify-content: center;
  `
}
