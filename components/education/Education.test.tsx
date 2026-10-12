import React from 'react'

import { render, screen } from '@testing-library/react'

import data from '@/public/data.json'
import { DataProvider } from '@/utils'

import { Education } from './Education'

describe('Education Component', () => {
    it('renders the school, degree and period', () => {
        render(
            <DataProvider>
                <Education />
            </DataProvider>
        )

        expect(screen.getByText(data.education.school)).toBeInTheDocument()
        expect(screen.getByText(new RegExp(data.education.degree))).toBeInTheDocument()
        expect(screen.getByText(data.education.period)).toBeInTheDocument()
    })
})
