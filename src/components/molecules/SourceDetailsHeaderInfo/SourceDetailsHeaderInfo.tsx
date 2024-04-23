import classNames from 'classnames';
import { useState, MouseEvent } from 'react';
import { SECTOR_MAP } from '@/store/useFilterStore/static';
import { useSetPopupMessage } from '@/store/usePopupMessageStore/usePopupMessageStore';
import Button from '@/components/atoms/ButtonGeneric/ButtonGeneric';
import Icon from '@/components/atoms/Icon/Icon';
import Tooltip from '@/components/atoms/Tooltip/Tooltip';
import TooltipToggle from '@/components/atoms/TooltipToggle/TooltipToggle';
import type { SourceDetailsHeaderInfoTypes } from './SourceDetailsHeaderInfo.types';
import styles from './SourceDetailsHeaderInfo.module.scss';

const SourceDetailsHeaderInfo = ({ name, gas, sector }: SourceDetailsHeaderInfoTypes.Props) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const setMessage = useSetPopupMessage();

    const onCopyWorthyItemClickHandler = (event: MouseEvent, text: string | undefined) => {
        event.stopPropagation();
        if (!text) return;
        navigator.clipboard.writeText(text);
        setMessage('Soure name copied to clipboard');
    };

    return (
        <div
            className={classNames(styles.info, {
                [styles['is-open']]: isOpen
            })}
        >
            <Button
                ariaLabel={`${isOpen ? 'Close' : 'Open'} additional source details for ${name}`}
                className={styles.toggle}
                onClick={() => setIsOpen(prevState => !prevState)}
            >
                <Icon icon='chevron-box' />
            </Button>
            {/* <ButtonBox
                details
                transparent
                outline
                className={styles.study}
                tooltip={{ text: 'Coming soon', position: 'top' }}
            >
                View Case Study
            </ButtonBox> */}
            <div className={styles['table-wrapper']}>
                <table>
                    <tbody>
                        <tr>
                            <th>Source name</th>
                            <td>
                                {name}
                                <Button
                                    ariaLabel={`Copy source name to clipboard: ${name}`}
                                    onClick={event => onCopyWorthyItemClickHandler(event, name)}
                                    className='tooltip-trigger'
                                >
                                    <Icon icon='copy' />
                                    <Tooltip text='Click to copy to clipboard' position='top' inline />
                                </Button>
                                <TooltipToggle
                                    tooltip={{
                                        text: 'gas_sector_cluster-distance_longitude_latitude',
                                        position: 'top',
                                        inline: true
                                    }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>Sector</th>
                            <td>
                                <span>{sector ? SECTOR_MAP[sector] : 'N/A'}</span>
                            </td>
                        </tr>
                        <tr>
                            <th>Gas type</th>
                            <td>{gas}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SourceDetailsHeaderInfo;
