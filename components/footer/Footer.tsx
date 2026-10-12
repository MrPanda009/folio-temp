import React from 'react'

import Link from 'next/link'

import { buildEmail, useSiteData } from '@/utils'

import styles from './styles.module.sass'

export const Footer: React.FC = () => {
    const data = useSiteData()

    const sayHi = () => {
        window.location.href = `mailto:${buildEmail(data?.emailParts)}`
    }

    return (
        <footer className={styles.footer}>
            <span>
                {`${data?.biography?.footer} `}
                <button
                    className={'textLink'}
                    type={'button'}
                    onClick={sayHi}
                >
                    {'Say hi'}
                </button>
                {'.'}
            </span>
            <span className={styles.small}>
                {'© '}
                {new Date().getFullYear()} {data?.biography?.name}
                {' · Design adapted from '}
                <Link
                    className={'textLink'}
                    href={'https://github.com/miksrv/miksoft.pro'}
                    target={'_blank'}
                    rel={'noopener noreferrer'}
                >
                    {'miksoft.pro'}
                </Link>
            </span>
        </footer>
    )
}
