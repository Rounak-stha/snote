import React, { useState, useLayoutEffect } from 'react'

export default function checkOverflow(ref: React.MutableRefObject<HTMLElement | null>): boolean {
    const [isOverflow, setIsOverflow] = React.useState(false)

    React.useLayoutEffect(() => {
        const { current } = ref

        if (current) {
            const hasOverflow = current.scrollHeight > current.clientHeight

            setIsOverflow(hasOverflow)
        }
    }, [ref])

    return isOverflow
}
