import { shortenText } from './shortenText';

describe('[Utils] shortenText', () => {

    it('should return the original text if it is shorter than the character limit', () => {
        const text = 'Hello, World!';
        const charactersLimit = 15;
        const result = shortenText(text, charactersLimit);
        expect(result).toBe(text);
    });

    it('should cut the text and add three dots if it is longer than the character limit', () => {
        const text = 'This is a longer text that exceeds the character limit.';
        const charactersLimit = 10;
        const result = shortenText(text, charactersLimit);
        expect(result).toBe('This is...')
    });

    it('should return an empty string if the text is empty', () => {
        const text = '';
        const charactersLimit = 10;
        const result = shortenText(text, charactersLimit);
        expect(result).toBe('');
    });


    it('should return an empty string if the character limit is zero', () => {
        const text = 'Hello, World!';
        const charactersLimit = 0;
        const result = shortenText(text, charactersLimit);
        expect(result).toBe('');
    });
})
