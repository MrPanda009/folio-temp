import React from 'react'

import { NextSeo } from 'next-seo'

import { Awards, Education, Hero, Now, Projects, Stack } from '@/components'
import { useSiteData } from '@/utils'

const MainPage: React.FC = () => {
    const data = useSiteData()

    return (
        <>
            <NextSeo
                title={data?.seo?.title}
                description={data?.seo?.description}
                canonical={data?.siteUrl}
                openGraph={{
                    images: [
                        {
                            height: 630,
                            url: `${data?.siteUrl}/og-image.png`,
                            width: 1200
                        }
                    ],
                    locale: 'en-IN',
                    siteName: data?.biography?.name
                }}
            />

            <Hero />
            <Now />
            <Projects />
            <Awards />
            <Education />
            <Stack />
        </>
    )
}

export default MainPage
