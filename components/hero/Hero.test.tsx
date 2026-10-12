import React from 'react'

import { render, screen } from '@testing-library/react'

import data from '@/public/data.json'
import { DataProvider } from '@/utils'

import { Hero } from './Hero'

describe('Hero Component', () => {
    it('renders the name, title, location and lead', () => {
        render(
            <DataProvider>
                <Hero />
            </DataProvider>
        )

        expect(screen.getByRole('heading', { level: 1, name: data.biography.name })).toBeInTheDocument()
        expect(screen.getByText(data.biography.title)).toBeInTheDocument()
        expect(screen.getByText(new RegExp(data.biography.location))).toBeInTheDocument()
        expect(screen.getByText(data.biography.lead)).toBeInTheDocument()
    })

    it('renders the avatar image', () => {
        render(
            <DataProvider>
                <Hero />
            </DataProvider>
        )

        expect(screen.getByAltText(data.biography.name)).toBeInTheDocument()
    })
})
