import React, { useState } from 'react'

import { useSiteData } from '@/utils'

import styles from './styles.module.sass'

const Chevron: React.FC = () => (
    <svg
        className={styles.chevron}
        viewBox={'0 0 10 10'}
        aria-hidden={'true'}
    >
        <path
            d={'M3 1.5 6.5 5 3 8.5'}
            fill={'none'}
            stroke={'currentColor'}
            strokeWidth={1.5}
        />
    </svg>
)

export const Awards: React.FC = () => {
    const data = useSiteData()

    // The headline award is expanded by default so its details are
    // visible without a single click; the rest open on demand.
    const [opened, setOpened] = useState<Set<number>>(new Set([0]))

    const handleToggle = (index: number, open: boolean) => {
        setOpened((prev) => {
            const next = new Set(prev)
            if (open) {
                next.add(index)
            } else {
                next.delete(index)
            }
            return next
        })
    }

    return (
        <section aria-label={'Awards'}>
            <p className={'sectionLabel'}>{'Awards'}</p>

            <ul className={styles.rows}>
                {data?.awards?.map((item, index) => (
                    <li key={item.title}>
                        <details
                            open={opened.has(index)}
                            onToggle={(event) => handleToggle(index, event.currentTarget.open)}
                        >
                            <summary>
                                <span className={styles.rowMain}>
                                    <span className={styles.role}>{item.title}</span>{' '}
                                    <span className={styles.orgGroup}>
                                        {/* eslint-disable-next-line react/jsx-max-depth */}
                                        <span className={styles.org}>
                                            {'· '}
                                            {item.org}
                                        </span>
                                        {/* eslint-disable-next-line react/jsx-max-depth */}
                                        <span className={styles.badge}>{item.badge}</span>
                                    </span>
                                </span>
                                <span className={styles.when}>{item.year}</span>
                                <Chevron />
                            </summary>
                            <div className={styles.body}>
                                <ul>
                                    {item.bullets.map((bullet) => (
                                        <li key={bullet.slice(0, 24)}>{bullet}</li>
                                    ))}
                                </ul>
                            </div>
                        </details>
                    </li>
                ))}
            </ul>
        </section>
    )
}
