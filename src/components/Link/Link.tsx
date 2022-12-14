import React from 'react'
import styled from 'styled-components'

interface Props {
  href?: string,
  newTab?: boolean,
  linkComponent?: React.ReactNode,
  children?: React.ReactNode
}

export const Link = ({
  href,
  newTab,
  linkComponent,
  children
}: Props) => {

  const LinkComponent = linkComponent

  return (<>
    {
      linkComponent
          // @ts-ignore
        ? <LinkComponent />
        : <S.Link 
            href={href} 
            target={newTab ? '_blank' : '_self'}
          >
            {
              children
            }
          </S.Link>
    }
  </>)
}

const S = {
  Link: styled.a`
    text-decoration: none;
  `
}