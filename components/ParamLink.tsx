import Link from 'next/link'
import { useEffect, useState } from 'react'

interface ParamLinkProps {
    name?: string;
    href: string;
    target?: string;
    className?: string;
    children?: React.ReactNode;
    id?: string;
    style?: React.CSSProperties;
}

const ParamLink = ({ name, href, target, className, children, id, style }: ParamLinkProps) => {
    const [searchParams, setSearchParams] = useState('')

    useEffect(() => {
        setSearchParams(window.location.search)
    }, [])

    return (
        <Link passHref legacyBehavior href={`${href}${searchParams}`} prefetch={false} id={id}>
            <a target={target} rel="noopener noreferrer" aria-label={name} className={className} style={style}>
                {name ?? children}
            </a>
        </Link>
    )
}

export default ParamLink
