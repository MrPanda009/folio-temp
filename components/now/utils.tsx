import React from 'react'

/**
 * Renders a plain string with **bold** markers as React nodes,
 * so data.json can emphasize fragments without storing HTML.
 */
export const renderBold = (text: string): React.ReactNode[] =>
    text.split(/\*\*(.+?)\*\*/g).map((part, i) => (i % 2 === 1 ? <b key={i}>{part}</b> : part))
