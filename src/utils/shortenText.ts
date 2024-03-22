
export const shortenText = (text: string, charactersLimit: number) => {

    if (charactersLimit === 0) {
        return '';
    }

    if (text.length > charactersLimit && text.length > 3) {
        const cutText = text.slice(0, charactersLimit - 3).replace(/\s+/g, ' ').trim();
        const lastCharacter = cutText.charAt(cutText.length - 1);

        if (lastCharacter === '.' || lastCharacter === ' ') {
            return cutText.slice(0, -1) + '...';
        }

        return cutText + '...';
    }

    return text;

}