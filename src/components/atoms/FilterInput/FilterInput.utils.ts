import type { FilterInputTypes } from './FilterInput.types'

export const getIcon = (inputType: FilterInputTypes.InputType): FilterInputTypes.IconType | undefined => {

    const allIcons: FilterInputTypes.Icons = [
        {
            type: 'text',
            icon: 'loupe'
        },
        {
            type: 'select',
            icon: 'chevron'
        }
    ];

    return allIcons.find(({ type }) => type === inputType)?.icon;
}