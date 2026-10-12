/**
 * The address never appears in the HTML or JSON as plain text: data.json stores
 * it as reversed [user, domain] parts, and it is assembled only in the browser
 * (typically on click), so harvesters that scrape markup never see it.
 */
export const buildEmail = (parts?: string[]): string => {
    const [user, domain] = parts ?? []

    if (!user || !domain) {
        return ''
    }

    const reverse = (value: string) => value.split('').reverse().join('')

    return `${reverse(user)}@${reverse(domain)}`
}
