import classNames from 'classnames';
import Image from 'next/image';
import { useState, useEffect, memo } from 'react';
import type { SourceImageTypes } from './SourceImage.types';
import styles from './SourceImage.module.scss';

const SourceImage = ({ plume, bg, className, onLoadingComplete: onLoad }: SourceImageTypes.Props) => {
    const [isLoaded, setIsLoaded] = useState<SourceImageTypes.IsLoaded>({ bg: false, plume: false });

    const onLoadingComplete = (type: 'plume' | 'bg') => {
        setIsLoaded(prevState => ({ ...prevState, [`${type}`]: true }))
    }

    useEffect(() => {
        Object.values(isLoaded).every(loaded => loaded) && onLoad?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoaded])

    return (
        <div className={classNames(styles.wrapper, className)}>
            <Image
                src={bg}
                alt=''
                fill
                onLoadingComplete={() => onLoadingComplete('bg')}
            />
            <Image
                className={styles.plume}
                src={plume}
                alt=''
                fill
                onLoadingComplete={() => onLoadingComplete('plume')}
            />
        </div>
    )
}


export default memo(SourceImage);
