import React from 'react'

import { render, screen } from '@testing-library/react'

import data from '@/public/data.json'
import { DataProvider } from '@/utils'

import { Stack } from './Stack'

describe('Stack Component', () => {
    it('renders every stack group with its items', () => {
        render(
            <DataProvider>
                <Stack />
            </DataProvider>
        )

        data.stack.forEach((row) => {
            expect(screen.getByText(row.group)).toBeInTheDocument()
            expect(screen.getByText(row.items)).toBeInTheDocument()
        })
    })
})
