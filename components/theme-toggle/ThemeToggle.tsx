import React from 'react'

import { Icon } from '@/components/icon'
import { useTheme } from '@/utils'

import styles from './styles.module.sass'

export const ThemeToggle: React.FC = () => {
    const { theme, toggleTheme } = useTheme()

    return (
        <button
            className={`${styles.themeToggle} themeToggleGlobal`}
            type={'button'}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            onClick={toggleTheme}
        >
            <Icon name={theme === 'dark' ? 'sun' : 'moon'} />
        </button>
    )
}
