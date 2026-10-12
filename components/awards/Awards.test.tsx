import React from 'react'

import { fireEvent, render, screen } from '@testing-library/react'

import data from '@/public/data.json'
import { DataProvider } from '@/utils'

import { Awards } from './Awards'

const renderAwards = () =>
    render(
        <DataProvider>
            <Awards />
        </DataProvider>
    )

describe('Awards Component', () => {
    it('renders every award with its organiser, badge and year', () => {
        renderAwards()

        data.awards.forEach((item) => {
            expect(screen.getByText(item.title)).toBeInTheDocument()
            expect(screen.getByText(`· ${item.org}`)).toBeInTheDocument()
            expect(screen.getAllByText(item.year).length).toBeGreaterThan(0)
        })
        expect(screen.getAllByText('Winner')).toHaveLength(data.awards.filter((a) => a.badge === 'Winner').length)
    })

    it('expands only the first award by default', () => {
        const { container } = renderAwards()
        const details = container.querySelectorAll('details')

        expect(details[0]).toHaveAttribute('open')
        expect(details[1]).not.toHaveAttribute('open')
    })

    it('opens a row when it is toggled', () => {
        const { container } = renderAwards()
        const second = container.querySelectorAll('details')[1]

        second.open = true
        fireEvent(second, new Event('toggle'))

        expect(second).toHaveAttribute('open')
    })
})
