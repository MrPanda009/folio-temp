import { renderBold } from './utils'

describe('renderBold', () => {
    it('splits **bold** fragments into <b> elements', () => {
        const nodes = renderBold('plain **bold** tail')

        expect(nodes).toHaveLength(3)
        expect(nodes[0]).toBe('plain ')
        expect(nodes[2]).toBe(' tail')
    })

    it('returns the whole string when there are no markers', () => {
        expect(renderBold('no markers')).toStrictEqual(['no markers'])
    })
})
