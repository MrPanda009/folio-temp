import React from 'react'

import { AppProps } from 'next/app'
import { Hanken_Grotesk } from 'next/font/google'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { Footer, ThemeToggle } from '@/components'
import { DataProvider, ThemeProvider } from '@/utils'

import '@/styles/theme.css'
import '@/styles/globals.sass'

const hankenGrotesk = Hanken_Grotesk({
    display: 'swap',
    subsets: ['latin'],
    weight: ['400', '500', '600']
})

const App = ({ Component, pageProps }: AppProps) => {
    const router = useRouter()
    const is404 = router.pathname === '/404'

    return (
        <>
            <Head>
                <meta
                    name={'mobile-web-app-capable'}
                    content={'yes'}
                />
                <meta
                    name={'viewport'}
                    content={'width=device-width, initial-scale=1, shrink-to-fit=no'}
                />
                <meta
                    name={'apple-mobile-web-app-status-bar-style'}
                    content={'black-translucent'}
                />
                <meta
                    name={'theme-color'}
                    content={'#141311'}
                    media={'(prefers-color-scheme: dark)'}
                />
                <meta
                    name={'theme-color'}
                    content={'#141311'}
                />
                <link
                    rel={'apple-touch-icon'}
                    sizes={'180x180'}
                    href={'/apple-touch-icon.png'}
                />
                <link
                    rel={'icon'}
                    type={'image/png'}
                    sizes={'32x32'}
                    href={'/favicon-32x32.png'}
                />
                <link
                    rel={'icon'}
                    type={'image/png'}
                    sizes={'16x16'}
                    href={'/favicon-16x16.png'}
                />
                <link
                    rel={'icon'}
                    href={'/favicon.ico'}
                    type={'image/x-icon'}
                />
                <link
                    rel={'manifest'}
                    href={'/site.webmanifest'}
                />
            </Head>

            <ThemeProvider>
                <DataProvider>
                    <div className={hankenGrotesk.className}>
                        <a
                            href={'#main-content'}
                            className={'skipLink'}
                        >
                            {'Skip to main content'}
                        </a>

                        <ThemeToggle />

                        <main id={'main-content'}>
                            {/* eslint-disable-next-line react/jsx-max-depth */}
                            <Component {...pageProps} />
                        </main>

                        {!is404 && <Footer />}
                    </div>
                </DataProvider>
            </ThemeProvider>
        </>
    )
}

export default App
