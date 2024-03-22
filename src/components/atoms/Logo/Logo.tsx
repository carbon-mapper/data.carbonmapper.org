import classNames from 'classnames';
import Link from 'next/link';
import Gradient from '@/components/atoms/Gradient/Gradient';
import LogoSVG from '@/assets/svg/logo.svg';
import styles from './Logo.module.scss';

export type Props = {
    href?: string;
    isGradientExtended?: boolean;
    className?: string;
};

const Logo = ({ href, isGradientExtended, className }: Props) => (
    <Link href={href ?? '/'} className={classNames('logo', styles.logo, className)}>
        <LogoSVG />
        <span className='sr-only'>Carbon Mapper Logo</span>
        <Gradient isExtended={isGradientExtended} />
    </Link>
);

export default Logo;
