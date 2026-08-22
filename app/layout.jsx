import './globals.css'
import settings from '../src/config/setting.js'

export const metadata = {
  title: `${settings.name} | Modern & High Performance REST APIs`,
  description: settings.description,
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icon.png', type: 'image/png' }
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-icon.png'
  },
  openGraph: {
    title: settings.name,
    description: settings.description,
    images: [
      {
        url: settings.icon,
        width: 800,
        height: 800,
        alt: settings.name
      }
    ]
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
