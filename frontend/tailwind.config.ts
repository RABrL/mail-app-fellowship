import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        principal: '#303052',
        button: '#fe6c91',
        textGray: '#f6f6f6',
        secondary: '#343458',
        text: '#0d0d31',
        navBarBg: '#20203e'
      }
    }
  },
  plugins: []
}
export default config
