import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import { gsap } from 'gsap';
import { useRef, useState, useEffect } from 'react';
import { useDrawStoreActions } from '@/store/useDrawStore/useDrawStore';
import { useFilterStore } from '@/store/useFilterStore/useFilterStore';
import { useLeftPanel, usePanelActions } from '@/store/usePanelStore/usePanelStore';
import { trackSearchSubmitEvent } from '@/hooks/useGTM';
import { useMsLoginRedirectHandler } from '@/hooks/useMsLoginRedirectHandler';
import { getIsInternalUser } from '@/utils/auth';
import { GLOBAL_IDS } from '@/utils/globals';
import { usePortalQueryParams, useClearQueryParams } from '@/utils/usePortalQueryParams';
import Button from '@/components/atoms/ButtonBasic/ButtonBasic';
import ButtonBox from '@/components/atoms/ButtonBox/ButtonBox';
import FilterViewTitle from '@/components/atoms/FilterViewTitle/FilterViewTitle';
import FiltersViewItem from '@/components/atoms/FiltersViewItem/FiltersViewItem';
import type { DashboardFiltersTypes } from './DashboardFilters.types';
import { useCloseSourceDetailsHandler } from '../SourceDetails/useCloseSourceDetails';
import {
    Checkboxes,
    Ranges,
    SectorToggle,
    InstrumentToggle,
    CalendarToggle,
    SaveSearchButton,
    Calendar,
    SectorList,
    InstrumentList,
    PlumeStatusToggle,
    PlumeStatusList,
    PlumeQualityList,
    PlumeQualityToggle
} from './DashboardFilters.fields';
import { EmissionConversionSelector } from './EmissionSelector';
import { EpsInput } from './EpsFilter';
import { getAnimationType } from '@/animations/framer';
import styles from './DashboardFilters.module.scss';

const DashboardFilters = () => {
    const formRef = useRef<HTMLFormElement>(null);
    const viewsRef = useRef<HTMLDivElement>(null);
    const calendarRef = useRef<HTMLDivElement>(null);
    const [realView, setRealView] = useState<DashboardFiltersTypes.ViewType>('main');
    const onCloseSourceDetail = useCloseSourceDetailsHandler();

    // This doesn't belong here - belongs on every page but needs to be inside the MSALProvider
    // ...or maybe it doesn't
    useMsLoginRedirectHandler();

    const isOpen = useLeftPanel() === 'filters';
    const { setLeftPanel } = usePanelActions();
    const view = useFilterStore(state => state.view);

    const clearAllFilters = useClearQueryParams();
    const [params, setParams] = usePortalQueryParams();
    const { setView } = useFilterStore();

    const variants = getAnimationType('filters');

    // TODO: revisit
    const { deleteAOI } = useDrawStoreActions();

    const onClearAllClick = () => {
        clearAllFilters();
        deleteAOI();
    };

    const handleCalendarScroll = (view: DashboardFiltersTypes.ViewType) => {
        if (view === 'calendar' || view === 'calendar-2nd') {
            const isBottom = view === 'calendar-2nd';
            const calendarEl = calendarRef.current;

            if (!calendarEl) return;

            calendarEl.scrollTop = isBottom ? calendarEl.scrollHeight : 0;
        }
    };

    useEffect(() => {
        const views = viewsRef.current;

        if (!views) return;

        gsap.killTweensOf(views);

        gsap.to(views, {
            xPercent: view === 'main' ? 0 : -100,
            duration: 0.4,
            ease: 'power2.out',
            onStart: () => {
                view !== 'main' && setRealView(view);
            },
            onComplete: () => {
                view === 'main' && setRealView(view);
            }
        });

        views.classList.toggle('is-extra-view', view !== 'main');
    }, [view]);

    useEffect(() => {
        handleCalendarScroll(view);
    }, [realView, view]);

    const isInternalUser = getIsInternalUser();

    return (
        <form
            className={classNames('filters', styles.filters)}
            id={GLOBAL_IDS.dashboard.filters.wrapper}
            ref={formRef}
            onSubmit={event => event.preventDefault()}
        >
            <AnimatePresence mode='wait'>
                {isOpen ? (
                    <motion.div
                        className={classNames('filters__inner', styles.inner)}
                        {...variants}
                        key='filters-inner'
                    >
                        <>
                            <div className={styles.views} ref={viewsRef}>
                                {/** Main View  */}
                                <div className={classNames(styles.view, 'is-main')}>
                                    <div className={classNames('scrollbar-hidden', styles.viewInner)}>
                                        {/** Livesearch */}
                                        <FiltersViewItem
                                            id={GLOBAL_IDS.dashboard.filters.livesearch}
                                            type='livesearch'
                                            bg='white'
                                        />

                                        {/** Calendar & Sector */}
                                        <FiltersViewItem id={GLOBAL_IDS.dashboard.filters.top} type='top' bg='blur'>
                                            <CalendarToggle onClick={setView} />
                                            <SectorToggle onClick={() => setView('sector')} />
                                            <InstrumentToggle onClick={() => setView('instrument')} />
                                            {isInternalUser && (
                                                <PlumeStatusToggle onClick={() => setView('plumeStatus')} />
                                            )}
                                            {isInternalUser && (
                                                <PlumeQualityToggle onClick={() => setView('plumeQualities')} />
                                            )}
                                        </FiltersViewItem>

                                        {/** Advanced options */}
                                        <FiltersViewItem
                                            id={GLOBAL_IDS.dashboard.filters.main}
                                            type='main'
                                            bg='white'
                                            fill
                                        >
                                            <Checkboxes />
                                            <EmissionConversionSelector />
                                            {/* <Toggles /> */}
                                            <Ranges />
                                            <EpsInput
                                                label={{
                                                    name: 'Plume Cluster Distance (m)',
                                                    tooltip:
                                                        'The minimum distance (in meters) plumes must be from each \
                                                        other to be considered in the same cluster based on the DBSCAN \
                                                        algorithm. Otherwise known as Epsilon (ε). The default plume \
                                                        cluster distance is 500 meters for Solid Waste (6A) and 250 \
                                                        meters for all other sectors.'
                                                }}
                                            />
                                        </FiltersViewItem>
                                    </div>
                                </div>

                                {/** Calendar Date Picker View  */}
                                {(realView === 'calendar' || realView === 'calendar-2nd') && (
                                    <div className={classNames(styles.view, 'is-calendar')}>
                                        <div
                                            className={classNames('scrollbar-hidden', styles.viewInner)}
                                            ref={calendarRef}
                                        >
                                            <FiltersViewItem
                                                bg='white'
                                                type='calendar'
                                                id={GLOBAL_IDS.dashboard.filters.date.toggle}
                                                fill
                                                noPadding
                                            >
                                                <FilterViewTitle
                                                    title='Select date / range'
                                                    onBackClick={() => setView('main')}
                                                    onClearClick={() => {
                                                        setParams({ date: undefined });
                                                        trackSearchSubmitEvent('date clear', {
                                                            ...params,
                                                            date: null
                                                        });
                                                    }}
                                                />
                                                <Calendar />
                                            </FiltersViewItem>
                                        </div>
                                    </div>
                                )}

                                {/** Select Sector View  */}
                                {realView === 'sector' && (
                                    <div className={classNames(styles.view, 'is-sector')}>
                                        <div className={classNames('scrollbar-hidden', styles.viewInner)}>
                                            <FiltersViewItem
                                                bg='white'
                                                type='select'
                                                id={GLOBAL_IDS.dashboard.filters.select.toggle}
                                                fill
                                                noPadding
                                            >
                                                <FilterViewTitle
                                                    title='Select sectors'
                                                    onBackClick={() => setView('main')}
                                                    onClearClick={() => {
                                                        setParams({ sector: [] });
                                                        trackSearchSubmitEvent('sector clear', {
                                                            ...params,
                                                            sector: []
                                                        });
                                                    }}
                                                />
                                                <SectorList />
                                            </FiltersViewItem>
                                        </div>
                                    </div>
                                )}

                                {/** Select Status View  */}
                                {realView === 'plumeStatus' && (
                                    // I don't see is-plumeStatus being used....
                                    <div className={classNames(styles.view, 'is-plumeStatus')}>
                                        <div className={classNames('scrollbar-hidden', styles.viewInner)}>
                                            <FiltersViewItem
                                                bg='white'
                                                type='select'
                                                id={GLOBAL_IDS.dashboard.filters.plumeStatus.toggle}
                                                fill
                                                noPadding
                                            >
                                                <FilterViewTitle
                                                    title='Select Plume Status'
                                                    onBackClick={() => setView('main')}
                                                    onClearClick={() => {
                                                        setParams({ plume_status: undefined });
                                                        trackSearchSubmitEvent('plume status clear', {
                                                            ...params,
                                                            plume_status: undefined
                                                        });
                                                    }}
                                                />
                                                <PlumeStatusList />
                                            </FiltersViewItem>
                                        </div>
                                    </div>
                                )}

                                {/** Select Instrument View  */}
                                {realView === 'instrument' && (
                                    <div className={classNames(styles.view, 'is-instrument')}>
                                        <div className={classNames('scrollbar-hidden', styles.viewInner)}>
                                            <FiltersViewItem
                                                bg='white'
                                                type='select'
                                                id={GLOBAL_IDS.dashboard.filters.instrument.toggle}
                                                fill
                                                noPadding
                                            >
                                                <FilterViewTitle
                                                    title='Select instruments'
                                                    onBackClick={() => setView('main')}
                                                    onClearClick={() => {
                                                        setParams({ instrument: [] });
                                                        trackSearchSubmitEvent('instrument clear', {
                                                            ...params,
                                                            instrument: []
                                                        });
                                                    }}
                                                />
                                                <InstrumentList />
                                            </FiltersViewItem>
                                        </div>
                                    </div>
                                )}

                                {/** Select Quality View  */}
                                {realView === 'plumeQualities' && (
                                    <div className={classNames(styles.view, 'is-instrument')}>
                                        <div className={classNames('scrollbar-hidden', styles.viewInner)}>
                                            <FiltersViewItem
                                                bg='white'
                                                type='select'
                                                id={GLOBAL_IDS.dashboard.filters.plumeQuality.toggle}
                                                fill
                                                noPadding
                                            >
                                                <FilterViewTitle
                                                    title='Select Plume Quality'
                                                    onBackClick={() => setView('main')}
                                                    onClearClick={() => {
                                                        setParams({ plume_qualities: [] });
                                                        trackSearchSubmitEvent('plume quality clear', {
                                                            ...params,
                                                            plume_qualities: []
                                                        });
                                                    }}
                                                />
                                                <PlumeQualityList />
                                            </FiltersViewItem>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/** Submit */}
                            <FiltersViewItem id={GLOBAL_IDS.dashboard.filters.submit} bg='blur' type='bottom'>
                                <SaveSearchButton />
                                <ButtonBox onClick={() => onClearAllClick()} outline type='button'>
                                    Clear filters
                                </ButtonBox>
                                <ButtonBox onClick={() => setLeftPanel(null)} outline type='button'>
                                    Close filters
                                </ButtonBox>
                            </FiltersViewItem>
                        </>
                    </motion.div>
                ) : (
                    <motion.div key='filters-closer' className={styles.closerWrapper} {...variants}>
                        <Button
                            onClick={() => {
                                setLeftPanel('filters');
                                onCloseSourceDetail();
                            }}
                            className={classNames('filters__closer', styles.closer)}
                        >
                            Show filters
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>
        </form>
    );
};

export default DashboardFilters;
