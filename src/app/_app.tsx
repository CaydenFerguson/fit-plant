// import { ThemeProvider } from '@emotion/react'
// import theme from './theme'
// import type { AppProps } from 'next/app'
// import { GlobalProvider } from './context/GlobalContext'
// import { getUserData } from '@/helpers/firebase'
// import { db, auth } from '@/config/firebase'
// import { useEffect, useState } from 'react'

// function MyApp({ Component, pageProps }: AppProps) {
//   // useEffect(() => {
//   //   console.log('Fetching user details')
//   //   async function getUsersData() {
//   //     const user = await getUserData(db, auth, 'users')
//   //     return user
//   //   }

//   //   setUser(getUsersData())
//   // }, [])
//   // const [user, setUser] = useState<any>(null)

//   const theme = {
//   // dark: {
//   colours: {
//     backgroundDark: '#2e2c2f',
//     backgroundLight: '#FFFFFF',
//     foregroundDark: '#29282A',
//     foregroundLight: '#E9E6E6',
//     buttonBlue: '#44C7AF', //Change me to something better
//     buttonDisabledBlue: '#A1E3D7', //Change me to something better
//     greyLight: '#2e2c2f',
//     greyDark: '#29282A',
//     textDark: '#29282A',
//     textLight: '#FFFFFF',
//     offWhite: '#E9E6E6',
//     activeNav: '#44C7AF',
//     hoverNav: 'rgba(68,199,175,0.1)',
//     linkBlue: '#66C3FF',
//     black: '#000000',
//     notificationLight: 'rgba(255,255,255,0.02)',
//     notificationDark: 'rgba(255,255,255,0.05)',
//     transparent: 'rgba(0,0,0,0)',
//   },
//   // },
//   // light: {
//   //   colours: {
//   //     backgroundDark: '#2e2c2f',
//   //     backgroundLight: '#FFFFFF',
//   //     foregroundDark: '#29282A',
//   //     foregroundLight: '#E9E6E6',
//   //     buttonBlue: '#44C7AF', //Change me to something better
//   //     buttonDisabledBlue: '#A1E3D7', //Change me to something better
//   //     greyLight: '#2e2c2f',
//   //     greyDark: '#29282A',
//   //     textDark: '#29282A',
//   //     textLight: '#FFFFFF',
//   //     offWhite: '#E9E6E6',
//   //     activeNav: '#44C7AF',
//   //     hoverNav: 'rgba(68,199,175,0.1)',
//   //     linkBlue: '#66C3FF',
//   //     black: '#000000',
//   //     notificationLight: 'rgba(255,255,255,0.02)',
//   //     notificationDark: 'rgba(255,255,255,0.05)',
//   //     transparent: 'rgba(0,0,0,0)',
//   //   },
//   // },
// }
//   return (
//     <ThemeProvider
//       theme={theme}
//       // theme={user?.prefferedTheme === 'dark' ? theme.dark : theme.light}
//     >
//       <Component {...pageProps} />
//     </ThemeProvider>
//   )
// }

// export default MyApp

// // What is this?
// // _app.tsx is specific to Next.js and plays a central role in how your app functions. In Next.js, the _app.tsx file allows you to customize the default App component, which is the top-level component for every page in your application.

// // Why Use _app.tsx?
// // When Next.js renders a page, it typically renders that page’s component directly. But if you have shared components, providers, or global styles that need to be applied across all pages, defining them in each page file would be inefficient and repetitive. That’s where _app.tsx comes in.

// // What Does _app.tsx Do?
// // The _app.tsx file in Next.js overrides the default App component. It allows you to:

// // Add global wrappers: You can wrap every page with providers (e.g., for global state, theming, authentication).
// // Define global layouts: If you have a consistent layout (e.g., a sidebar, header, or footer) that should appear on every page, you can include it here.
// // Apply global styles: Any CSS, CSS-in-JS, or theme settings can be applied here, which ensures that every page in the app has access to them.
// // How _app.tsx Works
// // In _app.tsx, Next.js passes the Component and pageProps props to your custom App component:

// // Component: This is the component for the page being rendered. For example, if you navigate to /about, Component will refer to the about page component.
// // pageProps: These are the initial props for the page, provided by Next.js. It can contain things like data fetched from the server (using getInitialProps, getServerSideProps, or getStaticProps).
// // By wrapping Component in providers (like ThemeProvider), you ensure that every page has access to the specified context or global settings.
