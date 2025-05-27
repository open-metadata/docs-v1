import Link from 'next/link'
import useQueryParams from '../hooks/useQueryParams'

interface ParamLinkProps {
    name?: string;
    link: string;
    target?: string;
    className?: string;
    children?: React.ReactNode;
    id?: string;
    style?: React.CSSProperties;
}

const ParamLink = ({ name, link, target, className, children, id, style }: ParamLinkProps) => {
    const params = useQueryParams();

    return (
        <Link passHref legacyBehavior href={`${link}?${params}`} prefetch={false} id={id}>
            <a target={target} rel="noopener noreferrer" aria-label={name} className={className} style={style}>
                {name ?? children}
            </a>
        </Link>
    )
}

export default ParamLink
