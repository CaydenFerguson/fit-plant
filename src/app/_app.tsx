import { ThemeProvider } from '@emotion/react'
import theme from './theme'
import type { AppProps } from 'next/app'
import { GlobalProvider } from './context/GlobalContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp

// What is this?
// _app.tsx is specific to Next.js and plays a central role in how your app functions. In Next.js, the _app.tsx file allows you to customize the default App component, which is the top-level component for every page in your application.

// Why Use _app.tsx?
// When Next.js renders a page, it typically renders that page’s component directly. But if you have shared components, providers, or global styles that need to be applied across all pages, defining them in each page file would be inefficient and repetitive. That’s where _app.tsx comes in.

// What Does _app.tsx Do?
// The _app.tsx file in Next.js overrides the default App component. It allows you to:

// Add global wrappers: You can wrap every page with providers (e.g., for global state, theming, authentication).
// Define global layouts: If you have a consistent layout (e.g., a sidebar, header, or footer) that should appear on every page, you can include it here.
// Apply global styles: Any CSS, CSS-in-JS, or theme settings can be applied here, which ensures that every page in the app has access to them.
// How _app.tsx Works
// In _app.tsx, Next.js passes the Component and pageProps props to your custom App component:

// Component: This is the component for the page being rendered. For example, if you navigate to /about, Component will refer to the about page component.
// pageProps: These are the initial props for the page, provided by Next.js. It can contain things like data fetched from the server (using getInitialProps, getServerSideProps, or getStaticProps).
// By wrapping Component in providers (like ThemeProvider), you ensure that every page has access to the specified context or global settings.
