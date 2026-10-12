import { buildEmail } from './email'

describe('buildEmail', () => {
    it('assembles the address from reversed parts', () => {
        expect(buildEmail(['resu', 'moc.elpmaxe'])).toBe('user@example.com')
    })

    it('returns an empty string when parts are missing', () => {
        expect(buildEmail()).toBe('')
        expect(buildEmail(['only-one'])).toBe('')
    })
})
