import React from 'react'

import Image from 'next/image'
import Link from 'next/link'

import { Icon } from '@/components/icon'
import { useSiteData } from '@/utils'
import { cn } from '@/utils/tools'

import styles from './styles.module.sass'

const ProjectIcon: React.FC<{ icon?: string; size: number }> = ({ icon, size }) => {
    if (icon?.startsWith('/')) {
        return (
            <Image
                src={icon}
                width={size}
                height={size}
                alt={''}
                loading={'lazy'}
            />
        )
    }

    return <Icon name={icon === 'telegram' ? 'telegram' : 'github'} />
}

export const Projects: React.FC = () => {
    const data = useSiteData()
    const projects = data?.projects

    const github = data?.contactLinks?.find((item) => item.icon === 'github')

    return (
        <section aria-label={'Projects'}>
            <p className={'sectionLabel'}>{'Projects'}</p>

            <div className={styles.grid}>
                {projects?.featured?.map((project) => (
                    <article
                        key={project.title}
                        className={cn(styles.card, 'wide' in project && !!project.wide && styles.wide)}
                    >
                        <div className={styles.cardHead}>
                            <ProjectIcon
                                icon={project.icon}
                                size={20}
                            />
                            <h3>
                                <Link
                                    href={project.link}
                                    target={'_blank'}
                                    rel={'noopener noreferrer'}
                                >
                                    {project.title}
                                </Link>
                            </h3>
                            <span
                                className={styles.arrow}
                                aria-hidden={'true'}
                            >
                                {'↗'}
                            </span>
                        </div>
                        <p>{project.description}</p>
                        <div className={styles.meta}>{project.stack}</div>
                        {'parts' in project && !!project.parts?.length && (
                            <div className={styles.parts}>
                                {project.parts.map((part) => (
                                    <Link
                                        key={part.link}
                                        className={styles.pill}
                                        href={part.link}
                                        target={'_blank'}
                                        rel={'noopener noreferrer'}
                                    >
                                        {part.label} <span>{'↗'}</span>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </article>
                ))}
            </div>

            <ul className={styles.list}>
                {projects?.more?.map((project) => (
                    <li key={project.title}>
                        <Link
                            href={project.link}
                            target={'_blank'}
                            rel={'noopener noreferrer'}
                        >
                            <span className={styles.listIcon}>
                                <ProjectIcon
                                    icon={'icon' in project ? project.icon : undefined}
                                    size={18}
                                />
                            </span>
                            <span className={styles.name}>{project.title}</span>
                            <span className={styles.desc}>{project.description}</span>
                            <span
                                className={styles.arrow}
                                aria-hidden={'true'}
                            >
                                {'↗'}
                            </span>
                        </Link>
                    </li>
                ))}
            </ul>

            {github && (
                <p className={styles.moreLink}>
                    <Link
                        className={'textLink'}
                        href={github.link}
                        target={'_blank'}
                        rel={'noopener noreferrer'}
                    >
                        {'More on GitHub →'}
                    </Link>
                </p>
            )}
        </section>
    )
}
