import { Auth0Provider } from '@auth0/auth0-react'
import { Grommet, grommet } from 'grommet'
import { deepMerge } from 'grommet/utils'
import type { AppProps } from 'next/app'

const customTheme = deepMerge(grommet, {
    global: {
        colors: { brand: '#228BE6' },
        font: { family: 'Roboto, sans-serif' }
    }
})

export default function App({ Component, pageProps }: AppProps) {
    return (
        <Auth0Provider
            domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN!}
            clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID!}
            authorizationParams={{
                audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE,
                redirect_uri: `${process.env.NEXT_PUBLIC_BASE_URL}/callback`
            }}
            cacheLocation="localstorage"
        >
            <Grommet theme={customTheme} full>
                <Component {...pageProps} />
            </Grommet>
        </Auth0Provider>
    )
}