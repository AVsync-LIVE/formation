import React from 'react'
import styled, { keyframes } from 'styled-components'

import { IconName, IconPrefix } from '@fortawesome/fontawesome-common-types'

import { Icon, Box, getLinkComponent } from '../../internal'

interface NavProps {
  type?: string,
  href?: string,
  title?: string,
  icon?: IconName,
  iconPrefix?: IconPrefix,
  name?: string,
  toolTipTitle?: string,
  active?: boolean,
  newTab?: boolean,
  onClick?: () => void,
  children?: React.ReactNode
}

export type Navs = NavProps[]

interface Props {
  onClose: () => void,
  open: boolean,
  navs: Navs,
  active?: boolean
}

export const Sidebar = ({ onClose, open, navs, active }: Props) => {
  const Link = getLinkComponent()

  const renderNavlink = ({ 
    href, 
    icon, 
    name, 
    toolTipTitle,
    newTab,
    onClick,
    active,
    children
  } : NavProps) => {
    const renderNavOption = () => (
      <S.NavOption 
        active={active} 
        key={`navOption${name}`} 
        open={true}
        title={toolTipTitle}
        onClick={() => {
          if (onClick) {
            onClick()
          }
        }}
      >
        <S.NavContent open={true}>
          {
            icon
              ? <S.IconContainer>
                  <Icon icon={icon} iconPrefix={'fas'} />
                </S.IconContainer>
              : <Box pl={2.25}/>
          }
          <S.Text>
            { name }
          </S.Text>
        </S.NavContent>
        {
          children
        }
      </S.NavOption>
    )

    return (
      href
        ? <Link href={href}>
            { 
              renderNavOption() 
            }
          </Link>
        : renderNavOption()
      
    )
  }

  const renderClickNav = ({ 
    icon, 
    name, 
    active, 
    onClick, 
    toolTipTitle,
    children
  }: NavProps) => (
    <S.NavOption 
      active={active} 
      onClick={() => {
        if (onClick) {
          onClick()
        }
      }}
      key={`navOption${name}`} 
      open={true}
      title={toolTipTitle}
    >
      <S.NavContent open={true} active={active}>
        {
          icon
            ? <S.IconContainer>
                <Icon icon={icon} iconPrefix={'fas'} />
              </S.IconContainer>
            : <Box pl={2.25}/>
        }
        <S.Text>
          { name }
        </S.Text>
      </S.NavContent>
      {
        children
      }
    </S.NavOption>
  )

  const renderNav = (props : NavProps) => {
    const { type } = props

    switch(type) {
      case 'nav':
        return renderNavlink(props)
      case 'clickNav':
        return renderClickNav(props)
      case 'spacer':
        return <S.VSpacer />
      case 'title':
        return <S.Title>{ props.title }</S.Title>
      default:
        return null
    }
  }

  return (<>
    <S.Sidebar>
      <S.SidebarContent open={open}>
        <S.NavOptions>
          {
            navs.map(props => renderNav(props))
          }
        </S.NavOptions>
      </S.SidebarContent>
    </S.Sidebar>
    <S.Backdrop 
      open={open}
      onClick={() => onClose()}
    />
  </>)
}

interface BackdropProps {
  open: boolean
}

interface SidebarContentProps {
  open: boolean
}
interface NavContentProps {
  open?: boolean,
  active?: boolean
}

const S = {
  Sidebar: styled.div`
    width: var(--F_Sidebar_Width);
    min-width: var(--F_Sidebar_Width);
    max-width: var(--F_Sidebar_Width);
    margin-top: var(--F_Header_Height);
    display: flex;
    height: calc(calc(100vh * var(--F_Zoom_Scale)) - var(--F_Header_Height));
    a {
      text-decoration: none;
    }
    @media screen and (max-width: 1024px) {
      position: fixed;
      left: 0;
      margin-top: 0;
      top: var(--F_Header_Height);
      z-index: 4;
    }
  `,
  Backdrop: styled.div<BackdropProps>`
    display: ${props => props.open ? 'flex' : 'none'};
    position: fixed;
    left: 0;
    top: 0;
    width: calc(100vw * var(--F_Zoom_Scale));
    height: calc(100vh * var(--F_Zoom_Scale));
    background: var(--F_Backdrop);
    z-index: 2;
    @media screen and (min-width: 1024px) {
      display: none;
    }
  `,
  SidebarContent: styled.div<SidebarContentProps>`
    height: 100%;
    background: var(--F_Background);
    border-right: ${props => props.open ? '1px solid var(--F_Surface)' : 'none'};
    top: 0;
    width: var(--F_Sidebar_Width);
    height: calc(100% * var(--F_Zoom_Scale));
    overflow-y: auto;
    overflow-x: hidden;
    user-select: none;
    z-index: 3;
    ::-webkit-scrollbar {
      width: 0;
    }

    &:hover {
      ::-webkit-scrollbar {
        width: .75rem;
      }
    }
  `,
  NavOptions: styled.div`
    width: 100%;
  `,
  NavOption: styled.div<NavContentProps>`
    cursor: pointer;
    background: ${props => props.active ? 'var(--F_Surface)' : 'none'};
    display: flex;
    flex-wrap: wrap;
    justify-content: ${props => props.open ? 'auto' : 'center'};
    align-items: center;
    height: ${props => props.open ? '46px' : 'var(--F_Sidebar_Icon_Width)'};
    width: 100%;

    * {
      color: ${props => props.active ? 'var(--F_Font_Color)' : 'auto'};
    }

    div {
      color: ${props => props.active ? 'var(--F_Font_Color)' : 'var(--F_Font_Color)'};
    }

    &:hover {
      background: ${props => props.active ? 'var(--F_Surface)' : 'var(--F_Surface_0)'};
      div {
        color: var(--F_Font_Color);
      }
    }
  `,
  NavContent: styled.div<NavContentProps>`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: ${props => props.open ? '0' : '.5rem'};
    height: ${props => props.open ? '100%' : 'auto'};
    align-items: ${props => props.open ? 'center' : 'auto'};
  `,
  IconContainer: styled.div`
    width: var(--F_Sidebar_Icon_Width);
    display: flex;
    justify-content: center;
  `,
  Text: styled.div`
    font-size: var(--F_Font_Size);
    letter-spacing: var(--F_Letter_Spacing_Title);
  `,
  VSpacer: styled.div`
    width: 100%;
    height: 1px;
    margin: .5rem 0;
    background: var(--F_Surface);
  `,
  Title: styled.div`
    text-transform: uppercase;
    color: var(--F_Font_Color_Label);
    font-weight: 600;
    padding: .5rem 0;
    padding-left: 1.5rem;
    padding-bottom: .5rem;
    font-size: var(--F_Font_Size);
    margin-top: .25rem;

  `
}

