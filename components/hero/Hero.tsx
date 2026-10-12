import React from 'react'

import Image from 'next/image'

import avatarPic from '@/public/avatar.webp'
import { useSiteData } from '@/utils'

import styles from './styles.module.sass'

export const Hero: React.FC = () => {
    const data = useSiteData()

    return (
        <header className={styles.hero}>
            <div className={styles.id}>
                <Image
                    className={styles.avatar}
                    src={avatarPic}
                    width={80}
                    height={80}
                    alt={data?.biography?.name ?? ''}
                    priority
                />
                <div>
                    <h1>{data?.biography?.name}</h1>
                    <p className={styles.roleLine}>{data?.biography?.title}</p>
                    <p className={styles.geoLine}>
                        {data?.biography?.location}
                        {' · '}
                        {data?.biography?.timezone}
                    </p>
                </div>
            </div>
            <p className={styles.lead}>{data?.biography?.lead}</p>
        </header>
    )
}
