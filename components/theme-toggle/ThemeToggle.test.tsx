import React from 'react'

import { fireEvent, render, screen } from '@testing-library/react'

import { ThemeProvider } from '@/utils'

import { ThemeToggle } from './ThemeToggle'

describe('ThemeToggle Component', () => {
    it('toggles the data-theme attribute on click', () => {
        render(
            <ThemeProvider>
                <ThemeToggle />
            </ThemeProvider>
        )

        const button = screen.getByRole('button', { name: 'Switch to light mode' })
        fireEvent.click(button)

        expect(document.documentElement).toHaveAttribute('data-theme', 'light')
        expect(screen.getByRole('button', { name: 'Switch to dark mode' })).toBeInTheDocument()
    })
})
