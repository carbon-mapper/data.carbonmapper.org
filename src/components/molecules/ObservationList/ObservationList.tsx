import { useEffect, useReducer, useRef } from 'react';
import type { SourceDataTypes } from '@/types/api/source.types';
import { useSourceDetailsSlice } from '@/store/useSourceDetailsSlice/useSourceDetailsSlice';
import { useKeyPress } from '@/hooks/useKeyPress';
import { useFitBounds } from '@/hooks/useMapMovements';
import ObservationListControls from '@/components/atoms/ObservationListControls/ObservationListControls';
import {
    ObservationListItem,
    EmptyObservationsListItem
} from '@/components/atoms/ObservationListItem/ObservationListItem';
import styles from './ObservationList.module.scss';

export type Plume = SourceDataTypes.Plume;
export type Scene = SourceDataTypes.Scene;
export type ListItemData = Plume | Scene;

export type SortOption = 'time-desc' | 'time-published-desc' | 'emission-desc';

export type SortAction = {
    type: 'time-desc' | 'time-published-desc' | 'emission-desc' | 'replace-data' | 'reverse';
    newData?: ListItemData[];
};

export type State = {
    data: ListItemData[];
    currentSort: SortOption;
    isReversed?: boolean;
};

const reducer = (state: State, action: SortAction) => {
    const data = [...state.data];

    switch (action.type) {
        case 'time-desc': {
            const updatedData = [...data].sort((a, b) => {
                const timeA = new Date('scene_timestamp' in a ? a.scene_timestamp : a.timestamp);
                const timeB = new Date('scene_timestamp' in b ? b.scene_timestamp : b.timestamp);
                return timeA < timeB ? 1 : -1;
            });
            return { data: updatedData, currentSort: action.type };
        }
        case 'time-published-desc': {
            const updatedData = [...data].sort((a, b) => {
                // For non-published plumes, use scene_timestamp instead??????
                const timeA = new Date('published_at' in a ? a.published_at || a.scene_timestamp : a.timestamp);
                const timeB = new Date('published_at' in b ? b.published_at || b.scene_timestamp : b.timestamp);
                return timeA < timeB ? 1 : -1;
            });
            return { data: updatedData, currentSort: action.type };
        }
        case 'emission-desc': {
            const updatedData = [...data].sort((a, b) => {
                const emissionA = 'emission_auto' in a && a.emission_auto ? a.emission_auto : 0;
                const emissionB = 'emission_auto' in b && b.emission_auto ? b.emission_auto : 0;
                return emissionA < emissionB ? 1 : -1;
            });
            return { data: updatedData, currentSort: action.type };
        }
        case 'reverse': {
            const updatedData = [...data].reverse();
            return { data: updatedData, currentSort: state.currentSort, isReversed: !state.isReversed };
        }
        case 'replace-data':
            return { ...state, data: action.newData || [] };

        default:
            return state;
    }
};

export type Props = {
    data: ListItemData[];
    sourceCoordinates: [number, number] | undefined;
};

export const ObservationsList = ({ data, sourceCoordinates }: Props) => {
    // This isn't state either. It's just sorting of the data
    const [state, dispatch] = useReducer(reducer, { data, currentSort: 'time-desc' });
    const listRef = useRef<HTMLUListElement>(null);

    const plumes = state.data.filter(entry => 'emission_auto' in entry);
    const fitBounds = useFitBounds();

    // Fix
    const { includeNullDetects, setIsCurrentSourcePHME, activePlume, setActivePlume } = useSourceDetailsSlice();

    const scrollToElement = (elList: HTMLElement, nextPlumeLayerId: string) => {
        const el = elList.querySelector(`[data-plume-id="${nextPlumeLayerId}"]`);
        if (!el) return;

        const y = (el as HTMLElement).offsetTop;

        elList.scroll({
            top: y,
            behavior: 'smooth'
        });
    };

    // This should be the same handler as onClick....Refactor later
    const onArrowMove = (direction: number): void => {
        const items = includeNullDetects ? state.data : plumes;

        const amount = items.length;

        if (amount < 2) {
            return;
        }

        const currentIndex = items.findIndex(item => item.id === activePlume?.id);
        let nextIndex = currentIndex + direction;

        if (nextIndex >= amount) {
            nextIndex = 0;
        }
        if (nextIndex < 0) {
            nextIndex = amount - 1;
        }

        const nextPlumeItem = items[nextIndex];
        const nextPlumeId = nextPlumeItem.id;

        if (!nextPlumeId) return;

        const nextPlumeCoords = 'geometry_json' in nextPlumeItem ? nextPlumeItem.geometry_json.coordinates : null;
        const nextPlumeBounds = 'plume_bounds' in nextPlumeItem ? nextPlumeItem.plume_bounds : null;
        const nextPlumeSceneId = 'scene_id' in nextPlumeItem ? nextPlumeItem.scene_id : nextPlumeItem.id;

        setActivePlume({
            id: nextPlumeId,
            coordinates: nextPlumeCoords,
            sceneID: nextPlumeSceneId,
            bounds: nextPlumeBounds
        });
        listRef.current && scrollToElement(listRef.current, nextPlumeId);
        nextPlumeBounds && fitBounds(nextPlumeBounds, { sourceDetailPadding: true, linear: true });
    };

    useKeyPress(() => {
        onArrowMove(1);
    }, ['ArrowDown']);

    useKeyPress(() => {
        onArrowMove(-1);
    }, ['ArrowUp']);

    // This is not state. It is a property of the data.
    // check if current source is PHME
    useEffect(() => {
        const isPHME = data.some(entry => 'phme_candidate' in entry && entry.phme_candidate);
        setIsCurrentSourcePHME(isPHME);
    }, [data, setIsCurrentSourcePHME]);

    // update reducer data
    useEffect(() => {
        const currentSort = state.currentSort;
        dispatch({ type: 'replace-data', newData: data });
        dispatch({ type: currentSort });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    return (
        <div className={styles.container}>
            <ObservationListControls sorting={state.currentSort} isReversed={state.isReversed} setSorting={dispatch} />
            <ul className={styles.list} ref={listRef}>
                {includeNullDetects
                    ? state.data.map(entry =>
                          'timestamp' in entry ? (
                              <EmptyObservationsListItem
                                  key={entry.id}
                                  scene={entry}
                                  sourceCoordinates={sourceCoordinates}
                              />
                          ) : (
                              <ObservationListItem
                                  key={entry.id}
                                  data={entry}
                                  includeNullDetects={includeNullDetects}
                              />
                          )
                      )
                    : state.data
                          .filter(entry => entry.hasOwnProperty('emission_auto'))
                          .map(entry => (
                              <ObservationListItem
                                  key={entry.id}
                                  data={entry}
                                  includeNullDetects={includeNullDetects}
                              />
                          ))}
            </ul>
        </div>
    );
};
