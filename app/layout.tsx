import './globals.css'
import Providers from "./providers";

export const metadata = {
  title: 'DogeConnect',
  description: 'DogeConnect',
}

export default function RootLayout({children, }: {children: React.ReactNode}) {
  
  return (
    <html lang="en">
      <body className={``}>
            <Providers>
                {children}
            </Providers>
      </body>
    </html>
  )
}