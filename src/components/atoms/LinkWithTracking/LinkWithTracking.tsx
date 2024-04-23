import Link from 'next/link';
import { trackEvent } from '@/hooks/useGTM';

/*
 * Wrapper component for Next Link of <a> tag to add tracking capabilities
 * Add isExternal prop for external links
 * Important: if passing children as elements, make sure to provide a trackingTitle prop
 */

interface Props extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    href: string;
    isExternal?: boolean;
    target?: string;
    className?: string;
    children: string | React.ReactNode;
    trackingTitle?: string;
}

export default function LinkWithTracking({ href, isExternal = false, children, trackingTitle, ...rest }: Props) {
    const trackingTitleWithFallback =
        trackingTitle ||
        (typeof children === 'string'
            ? children
            : 'WARNING: The children prop provided is not suitable as a tracking title');

    return isExternal ? (
        <a
            href={href}
            {...rest}
            onClick={() =>
                trackEvent({
                    event: 'external_link',
                    link_text: trackingTitleWithFallback,
                    link_url: href
                })
            }
        >
            {children}
        </a>
    ) : (
        <Link
            href={href}
            {...rest}
            onClick={() =>
                trackEvent({
                    event: 'external_link',
                    link_text: trackingTitleWithFallback,
                    link_url: href
                })
            }
        >
            {children}
        </Link>
    );
}
