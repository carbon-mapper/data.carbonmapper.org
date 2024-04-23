import classNames from 'classnames';
import Button from '@/components/atoms/ButtonGeneric/ButtonGeneric';
import Icon from '@/components/atoms/Icon/Icon';
import Link from '@/components/atoms/LinkWithTracking/LinkWithTracking';
import MiniMap from '@/components/atoms/MiniMap/MiniMap';
import Tooltip from '@/components/atoms/Tooltip/Tooltip';
import SourceDetailsHeaderInfo from '@/components/molecules/SourceDetailsHeaderInfo/SourceDetailsHeaderInfo';
import SourceDetailsTabSelector from '@/components/molecules/SourceDetailsTabSelector/SourceDetailsTabSelector';
import { useCloseSourceDetailsHandler } from '@/components/organisms/SourceDetails/useCloseSourceDetails';
import type { SourceDetailsHeaderTypes } from './SourceDetailsHeader.types';
import styles from './SourceDetailsHeader.module.scss';

const SourceDetailsHeader = ({ city, region, country, coordinates, sourceInfo }: SourceDetailsHeaderTypes.Props) => {
    const onCloseSourceDetails = useCloseSourceDetailsHandler();

    const { name, gas, sector } = sourceInfo || {};
    const [latitude, longitude] = coordinates || [];

    return (
        <section className={styles.container}>
            <h2 className={styles.heading}>
                <span>{city}, </span>
                {region !== 'N/A' && <span>{region}, </span>}
                <span className={classNames(styles.country, 'tooltip-trigger')}>
                    {country} <Icon icon={gas === 'CO2' ? 'source-co2' : 'source'} />
                    <Tooltip text='Source Point' position='right' inline />
                </span>
            </h2>

            <Link
                href={`http://maps.google.com/maps?t=k&q=loc:${longitude}+${latitude}`}
                isExternal
                target='_blank'
                className={styles.link}
                trackingTitle={`Open in Google Maps: ${name}`}
            >
                Open in Google Maps
            </Link>
            <Button ariaLabel='Close Source Details' className={styles.closer} onClick={() => onCloseSourceDetails()}>
                <Icon icon='closer-outline' />
            </Button>
            {coordinates && <MiniMap coordinates={coordinates} className={styles.map} />}
            <div className={styles.background}></div>
            <SourceDetailsHeaderInfo name={name} gas={gas} sector={sector} />
            <SourceDetailsTabSelector />
        </section>
    );
};

export default SourceDetailsHeader;
