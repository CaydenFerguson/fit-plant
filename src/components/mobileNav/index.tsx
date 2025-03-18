import React from 'react'
import { LinkItem, NavBar, NavContainer } from './style'
import { usePathname } from 'next/navigation'
import theme from '@/app/theme'
import Link from 'next/link'

export default function NavigationMobile({
  isLoggedIn,
  setLoggedIn,
  setShowNav,
  showNav,
}: any) {
  const pathname = usePathname()
  return (
    <NavContainer id="test">
      {/* <div
        style={{
          height: '30px',
          //   background: `linear-gradient(to top, rgb(46, 44, 47,1) 100%, rgb(46, 44, 47,0) 20%)`,
          background: `rgb(46, 44, 47,0.5)`,
        }}
      /> */}
      <NavBar>
        <Link style={{ width: '100%' }} href={'/'}>
          <LinkItem isActive={pathname === '/'}>
            <div style={{ height: '50px', width: 'auto' }}>
              <svg
                width={'50px'}
                height={'50px'}
                // style={{ margin: '-10px 0px' }}
                // fill={'white'}
                viewBox={'0 0 100 100'}
              >
                <image
                  href="/icons/iconsInverted.svg"
                  width="1000"
                  height="1000"
                />
              </svg>
            </div>
          </LinkItem>
        </Link>
        <Link style={{ width: '100%' }} href={'/plantpage'}>
          <LinkItem isActive={pathname === '/plantpage'}>
            <div style={{ height: '50px', width: 'auto' }}>
              <svg
                width={'50px'}
                height={'50px'}
                // style={{ margin: '-10px 0px' }}
                // fill={'white'}
                viewBox={'100 0 100 100'}
              >
                <image
                  href="/icons/iconsInverted.svg"
                  width="1000"
                  height="1000"
                />
              </svg>
            </div>
          </LinkItem>
        </Link>
        <Link style={{ width: '100%' }} href={'/upload'}>
          <LinkItem isActive={pathname === '/upload'}>
            <div style={{ height: '50px', width: 'auto' }}>
              <svg
                width={'50px'}
                height={'50px'}
                // style={{ margin: '-10px 0px' }}
                // fill={'white'}
                viewBox={'200 0 100 100'}
              >
                <image
                  href="/icons/iconsInverted.svg"
                  width="1000"
                  height="1000"
                />
              </svg>
            </div>
          </LinkItem>
        </Link>
        <Link style={{ width: '100%' }} href={'/tips'}>
          <LinkItem isActive={pathname === '/tips'}>
            <div style={{ height: '50px', width: 'auto' }}>
              <svg
                width={'50px'}
                height={'50px'}
                // style={{ margin: '-10px 0px' }}
                // fill={'white'}
                viewBox={'300 0 100 100'}
              >
                <image
                  href="/icons/iconsInverted.svg"
                  width="1000"
                  height="1000"
                />
              </svg>
            </div>
          </LinkItem>
        </Link>
        <Link style={{ width: '100%' }} href={'/about'}>
          <LinkItem isActive={pathname === '/about'}>
            <div style={{ height: '50px', width: 'auto' }}>
              <svg
                width={'50px'}
                height={'50px'}
                // style={{ margin: '-10px 0px' }}
                // fill={'white'}
                viewBox={'400 0 100 100'}
              >
                <image
                  href="/icons/iconsInverted.svg"
                  width="1000"
                  height="1000"
                />
              </svg>
            </div>
          </LinkItem>
        </Link>
        <Link style={{ width: '100%' }} href={'/settings'}>
          <LinkItem isActive={pathname === '/settings'}>
            <div style={{ height: '50px', width: 'auto' }}>
              <svg
                width={'50px'}
                height={'50px'}
                // style={{ margin: '-10px 0px' }}
                // fill={'white'}
                viewBox={'0 100 100 100'}
              >
                <image
                  href="/icons/iconsInverted.svg"
                  width="1000"
                  height="1000"
                />
              </svg>
            </div>
          </LinkItem>
        </Link>
      </NavBar>
    </NavContainer>
  )
}
