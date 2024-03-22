import { useAOI } from '@/store/useDrawStore/useDrawStore';
import { useSetPopupMessage } from '@/store/usePopupMessageStore/usePopupMessageStore';
import { useFilterTags } from '@/hooks/useTags';
import httpClient from '@/utils/httpClient';
import { usePortalQueryParams } from '@/utils/usePortalQueryParams';
import SaveForm from '../SaveForm/SaveForm';
import SavedFilterTags from '../SavedFilterTags/SavedFilterTags';
import styles from './SearchItemSave.module.scss';

export const SearchItemSave = ({ onSubmitCallback }: { onSubmitCallback: () => void }) => {
    const [queryParams] = usePortalQueryParams();
    const setMessage = useSetPopupMessage();
    const aoi = useAOI();
    const tags = useFilterTags({ params: queryParams, hasAoi: aoi !== null });

    const onSubmit = async (name: string) => {
        // If the AOI fails, the search should not be created
        try {
            const aoiID = aoi
                ? (
                      await httpClient.post<{ id: string }>('/layers/aoi', {
                          ...aoi,
                          name
                      })
                  ).data.id
                : undefined;

            const postParams: Record<string, unknown> = {
                name,
                query: queryParams
            };
            if (aoiID) {
                postParams.aoi_id = aoiID;
            }

            await httpClient.post('/account/search-request', postParams);

            onSubmitCallback();
        } catch (error) {
            setMessage('Error saving search');
            console.error(error);
        }
    };

    return (
        <SaveForm
            type='save'
            label='Search Name'
            options={{
                boxClassName: styles.box,
                info: 'Nisi adipisicing consequat cupidatat minim ut mollit culpa aute laboris. Veniam ea adipisicing nulla eiusmod est ullamco duis duis minim anim occaecat nulla enim. Eiusmod magna sit deserunt velit est occaecat sint sit nulla incididunt laborum. Velit voluptate adipisicing reprehenderit esse.',
                callbacks: {
                    onSubmit
                }
            }}
        >
            <SavedFilterTags tags={tags} />
        </SaveForm>
    );
};
