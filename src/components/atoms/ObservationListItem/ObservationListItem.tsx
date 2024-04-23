import classNames from 'classnames';
import { useRef } from 'react';
import type { MouseEvent } from 'react';
import type { SourceDataTypes } from '@/types/api/source.types';
import { useEmissionConversionType } from '@/store/useGlobalStore/useGlobalStore';
import { useSetPopupMessage } from '@/store/usePopupMessageStore/usePopupMessageStore';
import { useSourceDetailsSlice } from '@/store/useSourceDetailsSlice/useSourceDetailsSlice';
import { useFitBounds, useZoomToSource } from '@/hooks/useMapMovements';
import { convertEmissions } from '@/utils/converters';
import { INSTRUMENT_DETAILS_MAP, isNullOrUndefined } from '@/utils/globals';
import { customCoupledNotation } from '@/utils/math.utils';
import Button from '@/components/atoms/ButtonGeneric/ButtonGeneric';
import Icon from '@/components/atoms/Icon/Icon';
import Tooltip from '@/components/atoms/Tooltip/Tooltip';
import type { ObservationsListItemTypes } from './ObservationsListItem.types';
import { formatDisplayData, formatNullDisplayData } from './ObservationsListItem.utils';
import styles from './ObservationListItem.module.scss';

const getWindDataDisplayText = (plume: SourceDataTypes.Plume) => {
    if (isNullOrUndefined(plume.wind_speed_avg_auto) || isNullOrUndefined(plume.wind_direction_avg_auto)) {
        return 'Not available';
    }

    return `${plume.wind_speed_avg_auto.toFixed(1)} m/s from ${plume.wind_direction_avg_auto.toFixed(1)}°`;
};

// This should be refactored where this branches immediately
// One branch for scenes, another for plumes
// Anything that is common can try to happen before the branching
export const ObservationListItem = ({ data }: ObservationsListItemTypes.Props) => {
    const emissionConversion = useEmissionConversionType();
    const ref = useRef<HTMLDivElement>(null);
    const fitBounds = useFitBounds();

    const { activePlume, setActivePlume } = useSourceDetailsSlice(state => state);

    const setMessage = useSetPopupMessage();

    const {
        day,
        month,
        year,
        time,
        acquiredDay,
        acquiredMonth,
        acquiredYear,
        acquiredTime,
        publishedDay,
        publishedMonth,
        publishedYear,
        publishedTime,
        emission,
        uncertainty,
        plumeName,
        latitude,
        longitude,
        instrument,
        platform,
        sector
    } = formatDisplayData(data as SourceDataTypes.Plume);

    // All of this data checking for plume vs scene is not great
    const gas = 'gas' in data ? data.gas : null;
    const { emissions: convertedEmissions, uncertainty: convertedUncertainty } = convertEmissions(
        emission || 0,
        uncertainty || 0,
        { gas: gas || 'CH4', conversionType: emissionConversion }
    );
    const { count: emissonFormatted, uncertainty: uncertaintyFormatted } = customCoupledNotation(
        convertedEmissions,
        convertedUncertainty
    );

    const plumeId = data.id;
    const currentPlumeBounds = 'plume_bounds' in data ? data.plume_bounds : null;
    const currentPlumeCoordinates = 'geometry_json' in data ? data?.geometry_json?.coordinates : null;
    const currentPlumeSceneID = 'scene_id' in data ? data.scene_id : '';

    const onClickHandler = () => {
        setActivePlume({
            id: plumeId,
            coordinates: currentPlumeCoordinates,
            bounds: currentPlumeBounds,
            sceneID: currentPlumeSceneID
        });

        currentPlumeBounds && fitBounds(currentPlumeBounds, { sourceDetailPadding: true, linear: true });
    };

    const onMoreClickHandler = (event: MouseEvent) => {
        event.stopPropagation();
        ref.current?.classList.toggle(styles.expanded);
    };

    const onCopyClickHandler = (event: MouseEvent, message: string, text: string) => {
        event.stopPropagation();
        navigator.clipboard.writeText(text);
        setMessage(message);
    };

    return (
        <li
            className={classNames(styles.item, {
                [styles.isActive]: activePlume?.id === plumeId
            })}
            data-plume-id={data.id}
        >
            <div className={styles.details} ref={ref}>
                <div
                    className={classNames(styles.summary, {
                        // [styles.isPhme]: phme_candidate
                    })}
                >
                    <table>
                        <tbody>
                            <tr onClick={onClickHandler}>
                                <td className={styles.date}>
                                    <span>{`${month} ${day}`}</span>
                                    <br />
                                    <small>{year}</small>
                                </td>
                                <td className={styles.time}>
                                    <span>{time}</span>
                                    <br />
                                    <small>UTC</small>
                                </td>
                                {emission && uncertainty ? (
                                    <>
                                        <td className={styles.emission}>
                                            <span>{emissonFormatted}</span>
                                            <sub>+/-{uncertaintyFormatted}</sub>
                                        </td>
                                    </>
                                ) : (
                                    <td className={styles.noDetection}>
                                        <Icon icon='attention' />
                                        <span>Not yet quantified</span>
                                    </td>
                                )}
                                <td className={classNames('tooltip-trigger', styles['tooltip-toggle'])}>
                                    <Icon icon='plume-origin' />
                                    <Tooltip text='Plume origin point' position='left' inline />
                                </td>
                                <td className={styles.toggle}>
                                    <Button
                                        ariaLabel={`${
                                            ref.current?.classList.contains(styles.expanded) ? 'Hide' : 'Show'
                                        } more information about plume ${plumeName}`}
                                        onClick={onMoreClickHandler}
                                    >
                                        <Icon icon='more' />
                                    </Button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className={styles.more}>
                    <table>
                        <tbody>
                            <tr>
                                <th>Plume Name</th>
                                <td>
                                    <span className='uppercase'>{plumeName}</span>
                                    <button
                                        className='tooltip-trigger'
                                        onClick={event =>
                                            onCopyClickHandler(event, 'Plume name copied to clipboard', plumeName)
                                        }
                                    >
                                        <Icon icon='copy' />
                                        <Tooltip text='Click to copy to clipboard' position='left' inline />
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <th>Latitude, Longitude</th>
                                <td>
                                    <span>
                                        {latitude}, {longitude}
                                    </span>
                                    <Button
                                        ariaLabel={`Copy plume (${plumeName}) coordinates to clipboard`}
                                        onClick={event =>
                                            onCopyClickHandler(
                                                event,
                                                'Coordinates copied to clipboard',
                                                `${latitude}, ${longitude}`
                                            )
                                        }
                                        className='tooltip-trigger'
                                    >
                                        <Icon icon='copy' />
                                        <Tooltip text='Click to copy to clipboard' position='left' inline />
                                    </Button>
                                </td>
                            </tr>
                            <tr>
                                <th>Sector</th>
                                <td>{sector}</td>
                            </tr>
                            <tr>
                                <th>Instrument</th>
                                <td className='uppercase'>{instrument}</td>
                            </tr>
                            <tr>
                                <th>Platform</th>
                                <td>{platform}</td>
                            </tr>
                            <tr>
                                <th>Date Acquired</th>
                                <td className='uppercase'>{`
                                    ${acquiredMonth} ${acquiredDay}, ${acquiredYear}, ${acquiredTime} UTC
                                `}</td>
                            </tr>
                            <tr>
                                <th>Date Published</th>
                                <td>
                                    {publishedMonth === null
                                        ? 'Not yet published'
                                        : `${publishedMonth.toUpperCase()} ${publishedDay}, ${publishedYear}, ${publishedTime} UTC`}
                                </td>
                            </tr>
                            <tr>
                                <th>Wind Estimate</th>
                                <td>{getWindDataDisplayText(data as SourceDataTypes.Plume)}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </li>
    );
};

export const EmptyObservationsListItem = ({
    scene,
    sourceCoordinates
}: {
    scene: SourceDataTypes.Scene;
    sourceCoordinates: [number, number] | undefined;
}) => {
    const ref = useRef<HTMLDivElement>(null);

    const setMessage = useSetPopupMessage();
    const zoomToSource = useZoomToSource();

    const { activePlume, setActivePlume } = useSourceDetailsSlice(state => state);

    const { day, month, year, time } = formatNullDisplayData(scene);

    const sceneId = scene.id;
    const platform = INSTRUMENT_DETAILS_MAP[scene.instrument].platform;

    const onClickHandler = () => {
        setActivePlume({
            id: sceneId, // Bad!
            coordinates: sourceCoordinates ?? null,
            bounds: null,
            sceneID: sceneId
        });

        sourceCoordinates && zoomToSource(sourceCoordinates);
    };

    const onMoreClickHandler = (event: MouseEvent) => {
        event.stopPropagation();
        ref.current?.classList.toggle(styles.expanded);
    };

    const onCopyClickHandler = (event: MouseEvent, message: string, text: string) => {
        event.stopPropagation();
        navigator.clipboard.writeText(text);
        setMessage(message);
    };

    return (
        <li
            className={classNames(styles.item, {
                [styles.isActive]: activePlume?.sceneID === sceneId
            })}
        >
            <div className={styles.details} ref={ref}>
                <div className={styles.summary}>
                    <table>
                        <tbody>
                            <tr onClick={onClickHandler}>
                                <td className={styles.date}>
                                    <span>{`${month} ${day}`}</span>
                                    <br />
                                    <small>{year}</small>
                                </td>
                                <td className={styles.time}>
                                    <span>{time}</span>
                                    <br />
                                    <small>UTC</small>
                                </td>
                                <td className={styles.noDetection}>
                                    <Icon icon='attention' />
                                    <span>No plume detected</span>
                                </td>
                                <td className={styles.toggle}>
                                    <Button
                                        ariaLabel={`${
                                            ref.current?.classList.contains(styles.expanded) ? 'Hide' : 'Show'
                                        } more information about this null detect`}
                                        onClick={onMoreClickHandler}
                                    >
                                        <Icon icon='more' />
                                    </Button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className={styles.nullDetectMore}>
                    <table>
                        <tbody>
                            <tr>
                                <th>Scene Name</th>
                                <td>
                                    <span className='uppercase'>{scene.name}</span>
                                    <button
                                        className='tooltip-trigger'
                                        onClick={event =>
                                            onCopyClickHandler(event, 'Scene name copied to clipboard', scene.name)
                                        }
                                    >
                                        <Icon icon='copy' />
                                        <Tooltip text='Click to copy to clipboard' position='left' inline />
                                    </button>
                                </td>
                            </tr>
                            {sourceCoordinates && (
                                <tr>
                                    <th>Latitude, Longitude</th>
                                    <td>
                                        {sourceCoordinates[1].toFixed(5)}, {sourceCoordinates[0].toFixed(5)}
                                    </td>
                                </tr>
                            )}
                            <tr>
                                <th>Instrument</th>
                                <td className='uppercase'>{scene.instrument}</td>
                            </tr>
                            {platform && (
                                <tr>
                                    <th>Platform</th>
                                    <td>{platform}</td>
                                </tr>
                            )}
                            <tr>
                                <th>Date Acquired</th>
                                <td className='uppercase'>{`
                                    ${month} ${day}, ${year}, ${time} UTC
                                `}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </li>
    );
};
