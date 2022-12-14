import { IconName, IconPrefix } from '@fortawesome/fontawesome-common-types'
import React, { memo } from 'react'
import styled from 'styled-components'

import { getLinkComponent, Icon } from '../../internal'

interface Props {
  src?: string,
  onClick?: () => void,
  date?: Date,
  small?: boolean,
  href?: string,
  name?: string,
  active?: boolean,
  icon?: IconName,
  iconPrefix?: IconPrefix,
}

export const SpaceIcon = memo(({ 
  src, 
  onClick,
  date,
  small,
  href,
  name,
  active,
  icon,
  iconPrefix
}: Props) => {
  const Link = getLinkComponent()

  const renderSpaceIcon = () =>
    <S.SpaceIcon 
      src={src}
      onClick={onClick}
      small={small}
      title={name}
      active={active}
    >
      <S.Date darken={!!date}>
        {
          date
            ? <>
                <S.Month>{ date.toLocaleString('en-us', { month: 'short' }).toUpperCase() }</S.Month>
                <S.Day>{ date.toLocaleString('en-us', { day: 'numeric' }) }</S.Day>
                </>
            : icon
              ? <Icon icon={icon} iconPrefix={iconPrefix}/>
              : null
        }
      </S.Date>
    </S.SpaceIcon>

  return (<>
    {
      href
        ? <Link href={href}>
            {
              renderSpaceIcon()
            }
          </Link>
        : renderSpaceIcon()
    }
  </>)
})

const S = {
  SpaceIcon: styled.div<{
    active?: boolean,
    src?: string,
    small?: boolean,
  }>`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    width: 52px;
    min-width: 52px;
    height: 52px;
    background-size: cover;
    background-position: center;
    /* transform-origin: 0 0; */
    transform: ${props => props.small ? 'scale(0.75)' : 'none'};
    /* box-shadow: ${props => props.active ? 'none' : 'var(--F_Outline)'}; */
    transition: border-radius .3s;
    overflow: hidden;
    align-items: start;
    border-radius: ${props => props.active ? '.5rem' : '50%'};
    cursor: pointer;
    background-image: url(${props => props.src});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    background-color: ${props => props.src ? 'none' : 'var(--F_Surface_1)'};
    
    &:hover {
      background-color: ${props => props.src ? 'none' : 'var(--F_Surface_2)'};
    }
  `,
  Date: styled.div<{
    darken: boolean
  }>`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: center;
    color: white;
    * {
      color: ${props => props.darken ? 'white' : 'var(--F_Font_Color)'};
    }
    background: ${props => props.darken ? 'var(--F_Backdrop)' : 'none'};
  `,
  Month: styled.div`
    font-size: 14px;
    font-weight: 600;
    width: 100%;
    text-align: center;
  `,
  Day: styled.div`
    font-weight: 600;
    font-size: 20px;
    width: 100%;
    text-align: center;
    margin-top: -0.875rem;
  `
}
