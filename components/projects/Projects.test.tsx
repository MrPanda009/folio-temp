import React from 'react'

import { render, screen } from '@testing-library/react'

import data from '@/public/data.json'
import { DataProvider } from '@/utils'

import { Projects } from './Projects'

const renderProjects = () =>
    render(
        <DataProvider>
            <Projects />
        </DataProvider>
    )

describe('Projects Component', () => {
    it('renders every featured project as a card', () => {
        renderProjects()

        data.projects.featured.forEach((project) => {
            const link = screen.getByRole('link', { name: project.title })
            expect(link).toHaveAttribute('href', project.link)
            expect(screen.getByText(project.description)).toBeInTheDocument()
        })
    })

    it('renders sub-project pills for featured projects that have parts', () => {
        renderProjects()

        const withParts = data.projects.featured.filter((project) => 'parts' in project && project.parts)
        withParts.forEach((project) => {
            project.parts?.forEach((part) => {
                expect(screen.getAllByRole('link', { name: new RegExp(`^${part.label}`) }).length).toBeGreaterThan(0)
            })
        })
    })

    it('renders the remaining projects as list rows', () => {
        renderProjects()

        data.projects.more.forEach((project) => {
            expect(screen.getByText(project.title)).toBeInTheDocument()
            expect(screen.getByText(project.description)).toBeInTheDocument()
        })
    })

    it('links to GitHub for more projects', () => {
        renderProjects()

        const link = screen.getByRole('link', { name: 'More on GitHub →' })
        expect(link).toHaveAttribute('href', data.contactLinks.find((item) => item.icon === 'github')?.link)
    })
})
