import { isNumber } from '@/utils/isNumber';

export const isValidDate = (dateString: string, regex: RegExp) => {
    return regex.test(dateString);
}

export const getDefaultPayload = (payload: string) => {
    if (payload === '/') return '-';
    return payload;
}

export const processPayload = (payload: string, cursorPosition: number, inputValue: string) => {

    switch (cursorPosition) {
        case 1:
            if (isNumber(+payload) && +payload > 1) {
                payload = '0' + payload + '-';
            }
            break;

        case 2:
            if (isNumber(+payload) && inputValue[0] === '0' && payload === '0') {
                payload = '1'
            } else if (isNumber(+payload) && inputValue[0] !== '0' && (+payload > 2)) {
                payload = '2';
            }
          break;

        case 3:
            if (payload !== '-') {
                payload = '-' + payload;
            }
            break;

        case 4:
            if (isNumber(+payload) && (+payload > 3)) {
                payload = '0' + payload + '-';
            }
          break;

        case 5:
            if (isNumber(+payload) && inputValue[3] === '0' && (+payload === 0)) {
                payload = '1';
            } else if (isNumber(+payload) && inputValue[3] === '3' && (+payload > 1)) {
                payload = '1';
            }
          break;

        case 6:
            if (payload !== '-') {
                payload = '-' + (payload === '0' ? '1' : payload);
            }
          break;

        case 7:
            if (isNumber(+payload)) {
                if (+payload === 0) {
                    payload = '1';
                } else if (+payload > 2) {
                    payload = '2';
                }
            }
          break;

        default:
            break;
    }

    return payload;
}