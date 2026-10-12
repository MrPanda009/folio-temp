import React from 'react'

import { render, screen } from '@testing-library/react'

import data from '@/public/data.json'
import { DataProvider } from '@/utils'

import { Footer } from './Footer'

describe('Footer Component', () => {
    it('renders the copyright with the current year and name', () => {
        render(
            <DataProvider>
                <Footer />
            </DataProvider>
        )

        expect(screen.getByText(new RegExp(`© ${new Date().getFullYear()}`))).toBeInTheDocument()
        expect(screen.getByText(new RegExp(data.biography.name))).toBeInTheDocument()
    })

    it('credits the original design and renders the Say hi button', () => {
        render(
            <DataProvider>
                <Footer />
            </DataProvider>
        )

        expect(screen.getByRole('link', { name: 'miksoft.pro' })).toHaveAttribute(
            'href',
            'https://github.com/miksrv/miksoft.pro'
        )
        expect(screen.getByRole('button', { name: 'Say hi' })).toBeInTheDocument()
    })
})
