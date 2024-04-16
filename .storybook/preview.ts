import type { Preview } from '@storybook/react'

import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { withThemeFromJSXProvider } from '@storybook/addon-themes'

import { lightTheme, darkTheme } from '@/stories/themes'

/* TODO: replace with your own global styles, or remove */
const GlobalStyles = createGlobalStyle`
  body {
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  }
  `

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },

  decorators: [
    withThemeFromJSXProvider({
      themes: {
        light: lightTheme,
        dark: darkTheme,
      },
      defaultTheme: 'dark',
      Provider: ThemeProvider,
      GlobalStyles,
    }),
  ],
}

export default preview
