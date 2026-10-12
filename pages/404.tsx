import React from 'react'

import { NextPage } from 'next'
import Link from 'next/link'
import { NextSeo } from 'next-seo'

const NotFound: NextPage = () => (
    <div className={'page404'}>
        <NextSeo
            title={'Page not found'}
            nofollow={true}
            noindex={true}
        />
        <p className={'sectionLabel'}>{'404'}</p>
        <h1>{'This page doesn’t exist.'}</h1>
        <p>
            {'The link may be old, or the page was moved. '}
            <Link
                href={'/'}
                className={'textLink'}
            >
                {'Back to the home page'}
            </Link>
            {'.'}
        </p>
    </div>
)

export default NotFound
