import Image from 'next/image';
import { memo } from 'react';
import Logo from '@/components/atoms/Logo/Logo';
import PlaceholderImage from '@/assets/images/placeholder.jpg';
import styles from './PlaceholderView.module.scss';

const PlaceholderView = () => {

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>

                <div className={styles.image}>
                    <Image
                        src={PlaceholderImage}
                        alt='world map view'
                        placeholder='blur'
                    />
                </div>

                <div className={styles.inner}>
                    <div>
                        <Logo className={styles.logo} />
                    </div>
                    <h2 className={styles.title}>Discover on desktop</h2>
                    <p className={styles.text}>Mobile View is unavailable. Open on desktop to search for methane and CO2 emissions from around the world.</p>
                </div>

            </div>
        </div>
    )
}

export default memo(PlaceholderView);