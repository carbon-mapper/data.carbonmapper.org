export const getFilenameFromResponse = (response: Response): string | null => {
    const headers = response.headers;
    const contentDispositionHeader = headers.get('Content-Disposition');

    if (!contentDispositionHeader) return null;

    const filenameParts = contentDispositionHeader.split(';');
    const filename = filenameParts[1]?.split('=')[1];

    return filename;
};
