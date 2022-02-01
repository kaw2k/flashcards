import '../styles/reset.css'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import React from 'react'
import { DATABASE } from 'src/models/state'

function MyApp({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = React.useState(true)
  const router = useRouter()

  React.useEffect(() => {
    DATABASE.init().then(() => {
      if (!DATABASE.user.email) {
        router.push('/login')
      }

      setLoading(false)
    })
  }, [])

  return (
    <div>
      {loading ? <div>loading</div> : <Component {...pageProps} />}

      <style jsx global>{`
        :root {
          --ratio: 1.25;
          --s-5: calc(var(--s-4) / var(--ratio));
          --s-4: calc(var(--s-3) / var(--ratio));
          --s-3: calc(var(--s-2) / var(--ratio));
          --s-2: calc(var(--s-1) / var(--ratio));
          --s-1: calc(var(--s0) / var(--ratio));
          --s0: 1rem;
          --s1: calc(var(--s0) * var(--ratio));
          --s2: calc(var(--s1) * var(--ratio));
          --s3: calc(var(--s2) * var(--ratio));
          --s4: calc(var(--s3) * var(--ratio));
          --s5: calc(var(--s4) * var(--ratio));

          --black: #333;
          --blackTransparent: #3332;
        }

        * {
          font-family: 'Avenir', sans-serif;
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        html {
          font-size: 16px;
          line-height: 1.5;
          color: var(--black);
        }

        @media (min-width: 600px) {
          html {
            font-size: 20px;
          }
        }

        @media (min-width: 1024px) {
          html {
            font-size: 26px;
          }
        }

        h1 {
          font-size: var(--s4);
          font-weight: normal;
        }
        h2 {
          font-size: var(--s3);
          font-weight: normal;
        }
        h3 {
          font-size: var(--s2);
          font-weight: normal;
        }
        h4 {
          font-size: var(--s1);
          font-weight: normal;
        }

        a {
          text-decoration: none;
          font-weight: bold;
          color: var(--black);
        }

        a:hover,
        a:active,
        a.active {
          text-decoration: underline;
        }

        button,
        label,
        input[type='radio'] {
          cursor: pointer;
        }

        button,
        input {
          border: 1px solid var(--black);
          border-radius: 5px;
          padding: 5px 10px;
          background-color: transparent;
        }

        button:hover,
        button:active {
          background-color: var(--blackTransparent);
        }

        button.wrapper {
          border: none;
          background: transparent;
        }

        input {
          display: block;
          width: 100%;
        }

        ul {
          list-style-position: inside;
        }
      `}</style>
    </div>
  )
}

export default MyApp
