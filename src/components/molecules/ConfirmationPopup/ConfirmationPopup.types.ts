export namespace ConfirmationPopupTypes {
    export type Props = {
        title: string;
        cancelButtonText: string;
        agreeButtonText: string;
        onCancel: () => void;
        onAgree: () => void;
        subtitle?: string;
    };
}
