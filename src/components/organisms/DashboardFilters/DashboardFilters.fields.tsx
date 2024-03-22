import { GasType } from '@/types/api/source.types';
import { useAccountActions, useIsLoggedIn } from '@/store/useAccountStore/useAccountStore';
import {
    SECTOR_MAP,
    INSTRUMENT_MAP,
    MAX_PERSISTENCE_LIMIT,
    PLUME_STATUS_MAP,
    PLUME_QUALITY_MAP
} from '@/store/useFilterStore/static';
import { defaultDateStart, defaultDateEnd, FiltersDate } from '@/store/useFilterStore/useFilterStore';
import { useOverlay, usePanelActions } from '@/store/usePanelStore/usePanelStore';
import { useTrackedPortalQueryParams } from '@/hooks/useTrackedPortalQueryParams';
import { formatDate } from '@/utils/formatDate';
import { GLOBAL_IDS } from '@/utils/globals';
import { toggleArrayValues } from '@/utils/usePortalQueryParams';
import ButtonBox from '@/components/atoms/ButtonBox/ButtonBox';
import CalendarDatePicker from '@/components/atoms/CalendarDatePicker/CalendarDatePicker';
import FilterFieldset from '@/components/atoms/FilterFieldset/FilterFieldset';
import FilterInput from '@/components/atoms/FilterInput/FilterInput';
import FilterRange from '@/components/atoms/FilterRange/FilterRange';
import ToggleInput from '@/components/atoms/SceneListToggleInput/SceneListToggleInput';
import FilterCheckboxGroup from '@/components/molecules/CheckboxGroup/CheckboxGroup';
import FilterDate from '@/components/molecules/FilterDate/FilterDate';
import FilterSelectList from '@/components/molecules/FilterSelectList/FilterSelectList';
import withTooltipTextLabel from '@/hoc/withTooltipTextLabel/withTooltipTextLabel';
import type { DashboardFiltersTypes } from './DashboardFilters.types';
import { useGetSliderDefaults } from '../Map/hooks/useGetSliderDefaults';
import SaveSearchModal from '../SaveSearchModal/SaveSearchModal';
import { handleToggleDisplay } from './DashboardFilters.utils';

/*
 * Select Filters toggles:
 *  - Sector
 *  - Instrument
 */
export const SectorToggle = ({ onClick }: DashboardFiltersTypes.FieldToggleProps) => {
    const [{ sector }] = useTrackedPortalQueryParams();

    return (
        <FilterFieldset legend='Select sector'>
            <FilterInput
                type='select'
                label='Sector'
                options={{
                    value: handleToggleDisplay(sector, SECTOR_MAP),
                    inputNameTag: 'sector',
                    alt: 'select sector',
                    placeholder: 'Select sector',
                    id: GLOBAL_IDS.dashboard.filters.select.toggle, // what?
                    onClick
                }}
            />
        </FilterFieldset>
    );
};

export const InstrumentToggle = ({ onClick }: DashboardFiltersTypes.FieldToggleProps) => {
    const [{ instrument }] = useTrackedPortalQueryParams();

    return (
        <FilterFieldset legend='Select instrument'>
            <FilterInput
                type='select'
                label='Instrument'
                options={{
                    value: handleToggleDisplay(instrument, INSTRUMENT_MAP),
                    inputNameTag: 'instrument',
                    alt: 'select instrument',
                    placeholder: 'Select instrument',
                    id: GLOBAL_IDS.dashboard.filters.instrument.toggle,
                    onClick
                }}
            />
        </FilterFieldset>
    );
};

export const PlumeStatusToggle = ({ onClick }: DashboardFiltersTypes.FieldToggleProps) => {
    const [{ plume_status: plumeStatus }] = useTrackedPortalQueryParams();

    return (
        <FilterFieldset legend='Select Plume Status'>
            <FilterInput
                type='select'
                label='Plume Status'
                options={{
                    value: handleToggleDisplay(plumeStatus ? [plumeStatus] : [], PLUME_STATUS_MAP),
                    inputNameTag: 'plume_status',
                    alt: 'select plume status',
                    placeholder: 'Select Plume Status',
                    id: GLOBAL_IDS.dashboard.filters.plumeStatus.toggle,
                    onClick
                }}
            />
        </FilterFieldset>
    );
};

export const PlumeQualityToggle = ({ onClick }: DashboardFiltersTypes.FieldToggleProps) => {
    const [{ plume_qualities: plumeQualities }] = useTrackedPortalQueryParams();

    return (
        <FilterFieldset legend='Select Plume Quality'>
            <FilterInput
                type='select'
                label='Plume Quality'
                options={{
                    value: handleToggleDisplay(plumeQualities, PLUME_QUALITY_MAP),
                    inputNameTag: 'plume_qualities',
                    alt: 'select plume qualities',
                    placeholder: 'Select Plume Quality',
                    id: GLOBAL_IDS.dashboard.filters.plumeQuality.toggle,
                    onClick
                }}
            />
        </FilterFieldset>
    );
};

// Can probably be merged with InstrumentList
export const SectorList = () => {
    const [{ sector }, setParams] = useTrackedPortalQueryParams();

    const sectorDetails = Object.entries(SECTOR_MAP).map(([key, value]) => ({
        name: key,
        displayName: value,
        checked: sector.includes(key),
        onClick: () => {
            const newValues = toggleArrayValues(key, sector);

            setParams({ sector: newValues.length === Object.keys(SECTOR_MAP).length ? [] : newValues });
        }
    }));

    return (
        <FilterSelectList
            items={sectorDetails}
            isAll={sector.length === 0}
            onAllItemClick={() => setParams({ sector: [] })} // This function takes a param we don't need
        />
    );
};

export const InstrumentList = () => {
    const [{ instrument }, setParams] = useTrackedPortalQueryParams();

    const instrumentDetails = Object.entries(INSTRUMENT_MAP).map(([key, value]) => ({
        name: key,
        displayName: value,
        checked: instrument.includes(key),
        onClick: () => {
            const newValues = toggleArrayValues(key, instrument);

            setParams({ instrument: newValues.length === Object.keys(INSTRUMENT_MAP).length ? [] : newValues });
        }
    }));

    return (
        <FilterSelectList
            items={instrumentDetails}
            isAll={instrument.length === 0}
            onAllItemClick={() => setParams({ instrument: [] })}
        />
    );
};

export const PlumeStatusList = () => {
    const [{ plume_status: plumeStatus }, setParams] = useTrackedPortalQueryParams();

    const items = Object.entries(PLUME_STATUS_MAP).map(([key, value]) => ({
        name: key,
        displayName: value,
        checked: plumeStatus === key,
        onClick: () => setParams({ plume_status: key })
    }));

    return (
        <FilterSelectList
            items={items}
            isAll={typeof plumeStatus !== 'string'}
            onAllItemClick={() => setParams({ plume_status: undefined })}
        />
    );
};

export const PlumeQualityList = () => {
    const [{ plume_qualities: plumeQualities }, setParams] = useTrackedPortalQueryParams();

    const item = Object.entries(PLUME_QUALITY_MAP).map(([key, value]) => ({
        name: key,
        displayName: value,
        checked: plumeQualities.includes(key),
        onClick: () => {
            const newValues = toggleArrayValues(key, plumeQualities);

            setParams({ plume_qualities: newValues.length === Object.keys(PLUME_QUALITY_MAP).length ? [] : newValues });
        }
    }));

    return (
        <FilterSelectList
            items={item}
            isAll={plumeQualities.length === 0}
            onAllItemClick={() => setParams({ plume_qualities: [] })}
        />
    );
};

/*
 * Checkboxes:
 *  - Gas Type:
 *    - CH4
 *    - CO2
 */
export const Checkboxes = () => {
    const [{ gasType, emission_max, plume_max }, setParams] = useTrackedPortalQueryParams();
    const { ch4MaxEmissions, ch4MaxPlumes, co2MaxEmissions, co2MaxPlumes } = useGetSliderDefaults();

    // This is a touch confusing since undefined means both are selected
    const gasTypeHandler = (value: GasType) => {
        if (gasType === value) return; // do not allow empty

        // If both checkboxes are selected....
        if (gasType === undefined) {
            // We need to cap the emission_max and plume_max of the new gas
            const newSelectedGasType = value === 'CH4' ? 'CO2' : 'CH4';

            const updatedParams: { gasType?: string; emission_max?: number; plume_max?: number } = {
                gasType: newSelectedGasType
            };
            if (typeof emission_max === 'number') {
                const emissionMaxLimit = newSelectedGasType === 'CH4' ? ch4MaxEmissions : co2MaxEmissions;
                if (emission_max > emissionMaxLimit) updatedParams.emission_max = undefined;
            }
            if (typeof plume_max === 'number') {
                const plumeMaxLimit = newSelectedGasType === 'CH4' ? ch4MaxPlumes : co2MaxPlumes;
                if (plume_max > plumeMaxLimit) updatedParams.plume_max = undefined;
            }

            setParams(updatedParams);
        } else {
            setParams({ gasType: undefined });
        }
    };

    const items = [
        {
            value: 'CO2',
            isChecked: gasType === undefined || gasType === 'CO2',
            onClick: () => gasTypeHandler('CO2')
        },
        {
            value: 'CH4',
            isChecked: gasType === undefined || gasType === 'CH4',
            onClick: () => gasTypeHandler('CH4')
        }
    ];

    return (
        <FilterFieldset legend='Advanced gas type filters' small>
            <FilterCheckboxGroup
                items={items}
                label={{
                    name: 'Gas Type',
                    tooltip: (
                        <span>
                            The gas molecule detected during imaging operations, either CO
                            <sub>2</sub> or CH<sub>4</sub>.
                        </span>
                    )
                }}
            />
        </FilterFieldset>
    );
};

export const ToggleWithLabel = withTooltipTextLabel(ToggleInput);

/*
 *  Range filters
 *  Items: emission rate, plume count
 *  Props: min, max, step, defaultValues, isPercentage, onChange
 */
export const Ranges = () => {
    const { combinedMaxEmissions, combinedMaxPlumes } = useGetSliderDefaults();

    const [{ emission_min, emission_max, plume_min, plume_max, persistence_min, persistence_max }, setParams] =
        useTrackedPortalQueryParams();
    // Should still look to DRY this up
    const emissionRateFrom = emission_min ?? 0; // default 0
    const emissionRateTo = emission_max ?? combinedMaxEmissions; // default max
    const plumeCountFrom = plume_min ?? 0; // default 0
    const plumeCountTo = plume_max ?? combinedMaxPlumes; // default max
    const persistenceFrom = persistence_min ?? 0; // default 0
    const persistenceTo = persistence_max ?? MAX_PERSISTENCE_LIMIT; // Always 100

    const emissionStep = 100;
    const plumeStep = 1;
    const persistenceStep = 1;

    return (
        <FilterFieldset legend='Advanced range filters'>
            <FilterRange
                min={0}
                max={combinedMaxEmissions <= 0 ? emissionStep : combinedMaxEmissions}
                values={[emissionRateFrom, emissionRateTo <= 0 ? emissionStep : emissionRateTo]}
                step={emissionStep}
                isPercentage={false}
                onChange={([from, to]) => {
                    setParams({
                        emission_min: from === 0 ? undefined : from,
                        emission_max: to === combinedMaxEmissions ? undefined : to
                    });
                }}
                label={{
                    name: 'Source Emission Rate',
                    tooltip: (
                        <span>
                            The mass of CH<sub>4</sub> or CO<sub>2</sub> emitted per unit of time for an individual
                            source (kg/hr).
                        </span>
                    )
                }}
            />
            <FilterRange
                min={0}
                max={combinedMaxPlumes <= 0 ? plumeStep : combinedMaxPlumes}
                values={[plumeCountFrom, plumeCountTo <= 0 ? plumeStep : plumeCountTo]}
                step={plumeStep}
                isPercentage={false}
                onChange={([from, to]) => {
                    setParams({
                        plume_min: from === 0 ? undefined : from,
                        plume_max: to === combinedMaxPlumes ? undefined : to
                    });
                }}
                label={{
                    name: 'Number of Plumes',
                    tooltip: <span>The total number of identifiable plumes attributed to a single source.</span>
                }}
            />
            <FilterRange
                min={0}
                max={MAX_PERSISTENCE_LIMIT}
                values={[persistenceFrom, persistenceTo]}
                step={persistenceStep}
                isPercentage={true}
                onChange={([from, to]) => {
                    setParams({
                        persistence_min: from === 0 ? undefined : from,
                        persistence_max: to === MAX_PERSISTENCE_LIMIT ? undefined : to
                    });
                }}
                label={{
                    name: 'Source Persistence',
                    tooltip: (
                        <span>
                            (Experimental): The frequency at which a point source emits. Defined as the number of plumes
                            detected divided by the total number of overpasses.
                        </span>
                    )
                }}
            />
        </FilterFieldset>
    );
};

/*
 * Calendar
 */
export const CalendarToggle = ({ onClick }: DashboardFiltersTypes.FieldCalendarToggleProps) => {
    const [{ date }] = useTrackedPortalQueryParams();
    const start: FiltersDate = date?.date_start ?? null;
    const end: FiltersDate = date?.date_end ?? null;

    return (
        <FilterFieldset legend='Select date'>
            <FilterDate onClick={onClick} date={{ start, end }} />
        </FilterFieldset>
    );
};

export const CalendarItem = ({ type }: DashboardFiltersTypes.CalendarItemProps) => {
    const [{ date }, setParams] = useTrackedPortalQueryParams();
    const dateStart: FiltersDate = date?.date_start ?? null;
    const dateEnd: FiltersDate = date?.date_end ?? null;

    const activeDate = type === 'start' ? dateStart : dateEnd;
    const onChange = (newDate: FiltersDate) =>
        setParams({
            date: {
                date_start: type === 'start' ? newDate : dateStart,
                date_end: type === 'end' ? newDate : dateEnd
            }
        });

    const setDate = (date: Date | null) => (date ? onChange({ date, display: formatDate(date) }) : onChange(date));

    return (
        <CalendarDatePicker
            date={activeDate ? activeDate.date : null}
            minDate={type === 'end' ? dateStart?.date : undefined}
            maxDate={type === 'start' ? dateEnd?.date : undefined}
            activeDateStart={
                type === 'start'
                    ? dateStart?.date ?? defaultDateStart.toDate()
                    : dateEnd?.date ?? defaultDateEnd.toDate()
            }
            onChange={setDate}
            label={type === 'start' ? 'from' : 'to'}
        />
    );
};

export const Calendar = () => (
    <>
        <CalendarItem type='start' />
        <CalendarItem type='end' />
    </>
);

/*
 * Save Search Toggle
 */
export const SaveSearchButton = () => {
    const overlay = useOverlay();
    const { setLeftPanel, setOverlay } = usePanelActions();
    const isLoggedIn = useIsLoggedIn();
    const { setView: setAccountView, setMessage } = useAccountActions();

    const isLoggedInClick = () => setOverlay('save-search');
    const isNotLoggedInClick = () => {
        setLeftPanel('account');
        setAccountView('message');
        setMessage({
            title: 'Information',
            lines: [
                {
                    text: 'Please log in to use Save Search.',
                    button: {
                        label: 'Login',
                        view: 'login'
                    }
                },
                {
                    text: '...or create an account first.',
                    button: {
                        label: 'Register',
                        view: 'register'
                    }
                }
            ]
        });
    };
    const onClickHandler = isLoggedIn ? isLoggedInClick : isNotLoggedInClick;

    return (
        <>
            <ButtonBox outline type='button' onClick={onClickHandler}>
                Save Search
            </ButtonBox>
            <SaveSearchModal portalId='modals' onClose={() => setOverlay(null)} isOpen={overlay === 'save-search'} />
        </>
    );
};
