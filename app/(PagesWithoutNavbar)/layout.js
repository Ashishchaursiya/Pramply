import { ToasterDiv } from "@/components/toaster";
import "./globals.css";
import 'react-loading-skeleton/dist/skeleton.css'
import 'react-toastify/dist/ReactToastify.css';
export default function RootLayout({
  children,
} ) {
  return (
    <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />

          <link
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
            rel="stylesheet"
          ></link>
        </head>
      <body>
      <ToasterDiv />
        {children}</body>
    </html>
  )
}