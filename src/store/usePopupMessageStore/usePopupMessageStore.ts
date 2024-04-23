import { create } from 'zustand';

type PopupMessageStore = {
    message: string | null;
    setMessage: (message: string | null) => void;
};

const usePopupMessageStore = create<PopupMessageStore>(set => ({
    message: null,
    setMessage: message => set(() => ({ message }))
}));

export const usePopupMessage = () => usePopupMessageStore(state => state.message);
export const useSetPopupMessage = () => usePopupMessageStore(state => state.setMessage);
