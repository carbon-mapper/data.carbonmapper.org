import { zodResolver } from '@hookform/resolvers/zod';
import classNames from 'classnames';
import dynamic from 'next/dynamic';
import * as z from 'zod';
import type { FormEvent } from 'react';
import { useId, useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useFilterStore } from '@/store/useFilterStore/useFilterStore';
import { usePanelActions } from '@/store/usePanelStore/usePanelStore';
import { debounce } from '@/utils/debounce';
import { useLocation } from '@/utils/geocoding';
import { shortenText } from '@/utils/shortenText';
import { usePortalQueryParams } from '@/utils/usePortalQueryParams';
import ButtonIcon from '@/components/atoms/ButtonIcon/ButtonIcon';
import { useCloseSourceDetailsHandler } from '@/components/organisms/SourceDetails/useCloseSourceDetails';
import styles from './DashboardLivesearch.module.scss';

const LivesearchDropdown = dynamic(() => import('../LivesearchDropdown/LivesearchDropdown'), { ssr: false });

const DashboardLivesearch = () => {
    const { setLeftPanel } = usePanelActions();
    const [searchInput, setSearchInput] = useState<string>('');
    const setLivesearchTerm = useFilterStore(state => state.setLivesearchTerm);
    const onCloseSourceDetail = useCloseSourceDetailsHandler();
    const [{ location }, setParams] = usePortalQueryParams();
    const { locationData } = useLocation(location ?? undefined);
    const selectedLocation = locationData.at(0);

    const id = useId();

    const schema = z.object({
        livesearch: z.string().min(3)
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch
    } = useForm({
        defaultValues: {
            livesearch: ''
        },
        resolver: zodResolver(schema)
    });
    const watchField = watch('livesearch');

    const onSubmit = (event: FormEvent<HTMLFormElement>) => event.preventDefault();
    const onChange = handleSubmit(async ({ livesearch }) => {
        onCloseSourceDetail();
        setLeftPanel('filters');
        setSearchInput(livesearch);
        setLivesearchTerm(livesearch);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debouncedOnChange = useCallback(debounce(onChange, 30), []);

    useEffect(() => {
        (errors.livesearch || selectedLocation?.name) && setSearchInput('');
    }, [errors.livesearch, selectedLocation?.name]);

    return (
        <>
            <form className={styles.livesearch} onSubmit={onSubmit}>
                <div className={styles.item}>
                    <label htmlFor={`livesearch-input-${id}`} className={styles.label}>
                        <ButtonIcon
                            icon='loupe'
                            ariaLabel='Search location'
                            disabled
                            options={{
                                blue: true
                            }}
                        />
                    </label>

                    <input
                        className={classNames(styles.input, { 'is-empty': !selectedLocation?.name?.length })}
                        type='text'
                        autoComplete='off'
                        {...register('livesearch', {
                            onChange: debouncedOnChange
                            // onBlur: debouncedOnBlur
                        })}
                        id={`livesearch-input-${id}`}
                        placeholder='Search by location, coordinate or ID'
                        data-cy-id='livesearch-input'
                    />

                    {selectedLocation?.name && (
                        <div className={classNames('livesearch__current', styles.abs, styles.current)}>
                            <span>{shortenText(selectedLocation?.name, 35)}</span>
                        </div>
                    )}

                    <div className={classNames('livesearch__placeholder', styles.abs, styles.placeholder)}>
                        <span>
                            <strong>Search</strong>
                            by location, coordinate or name
                        </span>
                    </div>

                    {selectedLocation?.name && (
                        <button className={styles.delete} type='button' onClick={() => setParams({ location: null })}>
                            <ButtonIcon icon='closer-big' ariaLabel='Delete Location' noTracking />
                        </button>
                    )}
                </div>
            </form>
            {watchField && !errors.livesearch && <LivesearchDropdown searchInput={searchInput} callback={reset} />}
        </>
    );
};

export default DashboardLivesearch;
