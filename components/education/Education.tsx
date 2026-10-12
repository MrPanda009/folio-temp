import React from 'react'

import { useSiteData } from '@/utils'

import styles from './styles.module.sass'

export const Education: React.FC = () => {
    const data = useSiteData()
    const education = data?.education

    if (!education) {
        return null
    }

    return (
        <section aria-label={'Education'}>
            <p className={'sectionLabel'}>{'Education'}</p>
            <div className={styles.row}>
                <span className={styles.main}>
                    <span className={styles.school}>{education.school}</span>
                    <span className={styles.degree}>
                        {' · '}
                        {education.degree}
                    </span>
                </span>
                <span className={styles.when}>{education.period}</span>
            </div>
        </section>
    )
}
