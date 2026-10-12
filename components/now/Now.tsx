import React, { useRef, useState } from 'react'

import Link from 'next/link'

import { buildEmail, downloadVCard, useSiteData } from '@/utils'

import { renderBold } from './utils'

import styles from './styles.module.sass'

export const Now: React.FC = () => {
    const data = useSiteData()

    const [email, setEmail] = useState<string>('')
    const [copied, setCopied] = useState<boolean>(false)
    const emailRef = useRef<HTMLElement>(null)

    const revealEmail = () => {
        const address = buildEmail(data?.emailParts)
        setEmail(address)
        window.location.href = `mailto:${address}`
    }

    const copyEmail = async () => {
        try {
            await navigator.clipboard.writeText(email)
            setCopied(true)
        } catch {
            // Clipboard API refused — select the text so the user can copy it
            const selection = window.getSelection()
            if (emailRef.current && selection) {
                const range = document.createRange()
                range.selectNodeContents(emailRef.current)
                selection.removeAllRanges()
                selection.addRange(range)
            }
        }
    }

    const saveContact = async () => {
        await downloadVCard({
            name: data?.biography?.name ?? '',
            title: data?.biography?.title ?? '',
            email: buildEmail(data?.emailParts),
            links: [data?.siteUrl ?? '', ...(data?.contactLinks?.map((item) => item.link) ?? [])]
        })
    }

    return (
        <section aria-label={'About'}>
            <p className={'sectionLabel'}>{'Now'}</p>

            <div className={styles.prose}>
                {data?.biography?.now?.map((paragraph) => (
                    <p key={paragraph.slice(0, 24)}>{renderBold(paragraph)}</p>
                ))}
            </div>

            <nav
                className={styles.links}
                aria-label={'Contact links'}
            >
                {data?.contactLinks?.map((item, index) => (
                    <React.Fragment key={item.link}>
                        {index > 0 && (
                            <span
                                className={styles.sep}
                                aria-hidden={'true'}
                            >
                                {'·'}
                            </span>
                        )}
                        <Link
                            className={'textLink'}
                            href={item.link}
                            target={'_blank'}
                            rel={'noopener noreferrer'}
                        >
                            {item.label}
                        </Link>
                    </React.Fragment>
                ))}
                <span
                    className={styles.sep}
                    aria-hidden={'true'}
                >
                    {'·'}
                </span>
                <button
                    className={'textLink'}
                    type={'button'}
                    onClick={revealEmail}
                >
                    {'Email'}
                </button>
                <span
                    className={styles.sep}
                    aria-hidden={'true'}
                >
                    {'·'}
                </span>
                <a
                    className={'textLink'}
                    href={data?.resumeUrl}
                    target={'_blank'}
                    rel={'noopener noreferrer'}
                >
                    {'Resume (PDF)'}
                </a>
                <span
                    className={styles.sep}
                    aria-hidden={'true'}
                >
                    {'·'}
                </span>
                <button
                    className={'textLink'}
                    type={'button'}
                    onClick={saveContact}
                >
                    {'Save contact'}
                </button>
            </nav>

            {!!email && (
                <div className={styles.emailReveal}>
                    <code ref={emailRef}>{email}</code>
                    <button
                        className={'textLink'}
                        type={'button'}
                        onClick={copyEmail}
                    >
                        {copied ? 'Copied' : 'Copy'}
                    </button>
                </div>
            )}
        </section>
    )
}
