/**
 * Builds and downloads a vCard (.vcf) so a new acquaintance can save the
 * contact — with the photo showing on their phone's contact card — in one tap.
 * The photo is fetched from /avatar-vcard.jpg and embedded as base64.
 */
export const downloadVCard = async (options: {
    name: string
    title: string
    email: string
    links: string[]
}): Promise<void> => {
    let photo = ''

    try {
        const response = await fetch('/avatar-vcard.jpg')
        const buffer = await response.arrayBuffer()
        let binary = ''
        new Uint8Array(buffer).forEach((byte) => {
            binary += String.fromCharCode(byte)
        })
        photo = btoa(binary)
    } catch {
        // The card is still useful without the photo
    }

    const [firstName, ...lastName] = options.name.split(' ')

    const lines = [
        'BEGIN:VCARD',
        'VERSION:3.0',
        `N:${lastName.join(' ')};${firstName};;;`,
        `FN:${options.name}`,
        `TITLE:${options.title}`,
        `EMAIL;TYPE=INTERNET:${options.email}`,
        ...options.links.map((link) => `URL:${link}`),
        ...(photo ? [`PHOTO;ENCODING=b;TYPE=JPEG:${photo}`] : []),
        'END:VCARD'
    ]

    const blob = new Blob([lines.join('\r\n')], { type: 'text/vcard' })
    const anchor = document.createElement('a')
    anchor.href = URL.createObjectURL(blob)
    anchor.download = `${options.name.toLowerCase().replace(/\s+/g, '-')}.vcf`
    document.body.appendChild(anchor)
    anchor.click()
    anchor.remove()
    URL.revokeObjectURL(anchor.href)
}
