export namespace BulkDownloadListTypes {
    export type ListItem = {
        filename: string;
        size: string;
        year: string;
    };

    export type Props = {
        title: string;
        linksList: ListItem[];
        withGeoTifs: boolean;
    };
}
