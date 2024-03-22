import { shortenText } from '@/utils/shortenText';

export const handleToggleDisplay = (selectedKeys: string[], keyDisplayMap: Record<string, string>) => {
    const selectedItemsLength = Object.values(selectedKeys).length;
    const allItemsLength = Object.keys(keyDisplayMap).length;

    // At some point, we may want to have selectedItemsLength === 0 result in different text like "None"
    if (selectedItemsLength === allItemsLength || selectedItemsLength === 0) {
        return 'All';
    }

    if (selectedItemsLength > 0) {
        return shortenText(selectedKeys.map(key => keyDisplayMap[key]).join(', '), 38);
    }

    // This should never happen
    return 'None';
};
