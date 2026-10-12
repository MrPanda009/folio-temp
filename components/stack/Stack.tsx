import React from 'react'

import { useSiteData } from '@/utils'

import styles from './styles.module.sass'

export const Stack: React.FC = () => {
    const data = useSiteData()

    return (
        <section aria-label={'Stack'}>
            <p className={'sectionLabel'}>{'Stack'}</p>
            <dl className={styles.stack}>
                {data?.stack?.map((row) => (
                    <React.Fragment key={row.group}>
                        <dt>{row.group}</dt>
                        <dd>{row.items}</dd>
                    </React.Fragment>
                ))}
            </dl>
        </section>
    )
}
