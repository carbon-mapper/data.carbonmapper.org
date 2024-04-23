import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { Range, getTrackBackground } from 'react-range';
import { useIsAccessibility } from '@/store/useGlobalStore/useGlobalStore';
import withTooltipTextLabel from '@/hoc/withTooltipTextLabel/withTooltipTextLabel';
import styles from './FilterRange.module.scss';

type Props = {
    min: number;
    max: number;
    step: number;
    values: [number, number];
    isPercentage?: boolean;
    onChange: (values: [number, number]) => void;
};

const FilterRange = ({ min, max, step, values: initialValues, isPercentage, onChange }: Props) => {
    const isAccessibility = useIsAccessibility();

    const [values, setValues] = useState(initialValues);

    // Need to update values if changes to these values are made from outside components
    // There may be a better way to do this
    useEffect(() => {
        if (values[0] === initialValues[0] && values[1] === initialValues[1]) return;
        setValues(initialValues);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialValues]); // purposely leaving out "values"

    return (
        <div className={styles.wrapper}>
            <div className={styles.labels}>
                <span>
                    {0}
                    {isPercentage ? '%' : ''}
                </span>
                <strong>
                    {values.join('-')}
                    {isPercentage ? '%' : ''}
                </strong>
                <span>
                    {max}
                    {isPercentage ? '%' : ''}
                </span>
            </div>
            <Range
                step={step}
                min={0}
                max={max}
                values={values}
                onFinalChange={([from, to]) => onChange([from, to])}
                onChange={([from, to]) => setValues([from, to])}
                renderThumb={({ props, index }) => (
                    <button
                        {...props}
                        className={classNames('thumb', styles.thumb, `is-${index === 0 ? 'first' : 'second'}`)}
                        type='button'
                    >
                        <span className='sr-only'>change range</span>
                    </button>
                )}
                renderTrack={({ props, children }) => (
                    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
                    <div
                        {...props}
                        onMouseDown={props.onMouseDown}
                        onTouchStart={props.onTouchStart}
                        className={styles.bar}
                    >
                        <span
                            ref={props.ref}
                            className={styles.track}
                            style={{
                                background: getTrackBackground({
                                    values,
                                    colors: ['transparent', isAccessibility ? '#0026FF' : '#3E8CF0', 'transparent'],
                                    min,
                                    max
                                })
                            }}
                        ></span>
                        {children}
                    </div>
                )}
            />
        </div>
    );
};

export default withTooltipTextLabel(FilterRange);
