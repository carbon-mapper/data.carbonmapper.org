declare namespace Components {
    namespace Schemas {
        /**
         * AoiFormIn
         */
        export interface AoiFormIn {
            /**
             * Name
             */
            name?: /* Name */ string | null;
            /**
             * Description
             */
            description?: /* Description */ string | null;
        }
        /**
         * AoiIn
         */
        export interface AoiIn {
            geometry_json: /**
             * MultiPolygon
             * MultiPolygon Model
             */
            MultiPolygon;
            /**
             * Name
             */
            name?: /* Name */ string | null;
            /**
             * Description
             */
            description?: /* Description */ string | null;
        }
        /**
         * AoiMutationOut
         */
        export interface AoiMutationOut {
            /**
             * Id
             */
            id?: string; // uuid
        }
        /**
         * AoiOut
         */
        export interface AoiOut {
            geometry_json: /**
             * MultiPolygon
             * MultiPolygon Model
             */
            MultiPolygon | null;
            /**
             * Name
             */
            name?: /* Name */ string | null;
            /**
             * Description
             */
            description?: /* Description */ string | null;
        }
        /**
         * AssignmentIn
         */
        export interface AssignmentIn {
            /**
             * User
             */
            user_id?: /* User */ number | null;
            /**
             * Assignees
             */
            assignees: number[];
            /**
             * Scenes
             */
            scenes: string[];
            /**
             * Note
             */
            note?: /* Note */ string | null;
        }
        /**
         * AssignmentOut
         */
        export interface AssignmentOut {
            /**
             * Id
             */
            id: number;
            user: /* UserOut */ UserOut;
            /**
             * Assignees
             */
            assignees: /* UserOut */ UserOut[];
            /**
             * Usersceneassignmentstatus Set
             */
            usersceneassignmentstatus_set?: /* Usersceneassignmentstatus Set */ /* UserSceneAssignmentStatusOut */ UserSceneAssignmentStatusOut[] | null;
            status?: /* Status */ Status | null;
            /**
             * Created
             */
            created: string; // date-time
            /**
             * Note
             */
            note?: /* Note */ string | null;
            /**
             * Scenes
             */
            scenes: string[];
        }
        /**
         * BaseModel
         */
        export interface BaseModel {
        }
        /**
         * BasicAssignmentOut
         */
        export interface BasicAssignmentOut {
            /**
             * Id
             */
            id: number;
            /**
             * Note
             */
            note?: /* Note */ string | null;
            /**
             * Status
             */
            status?: /* Status */ string | null;
        }
        /**
         * BasicUserOut
         */
        export interface BasicUserOut {
            /**
             * Label
             */
            label: string;
            /**
             * Email Address
             */
            email: string;
            /**
             * ID
             */
            id?: /* ID */ number | null;
        }
        /**
         * BboxFilter
         */
        export interface BboxFilter {
            /**
             * Bbox
             */
            bbox?: /* Bbox */ any[] | null;
        }
        /**
         * ChangePasswordIn
         */
        export interface ChangePasswordIn {
            /**
             * Old Password
             */
            old_password: string;
            /**
             * New Password1
             */
            new_password1: string;
            /**
             * New Password2
             */
            new_password2: string;
        }
        /**
         * CloudCover
         */
        export type CloudCover = "0" | "25" | "50" | "75" | "100";
        /**
         * CustomTokenObtainPairInputSchema
         */
        export interface CustomTokenObtainPairInputSchema {
            /**
             * Password
             */
            password: string;
            /**
             * Email Address
             */
            email: string;
        }
        /**
         * CustomTokenObtainPairOutSchema
         */
        export interface CustomTokenObtainPairOutSchema {
            /**
             * Refresh
             */
            refresh: string;
            /**
             * Access
             */
            access: string;
            /**
             * Groups
             */
            groups: string;
            /**
             * Permissions
             */
            permissions: string[];
        }
        /**
         * ErrorsOut
         */
        export interface ErrorsOut {
            /**
             * Errors
             */
            errors: {
                [name: string]: string[];
            };
        }
        /**
         * Feature
         * Feature Model
         */
        export interface Feature {
            /**
             * Bbox
             */
            bbox?: /* Bbox */ any[] | any[] | null;
            /**
             * Type
             */
            type: "Feature";
            /**
             * Geometry
             */
            geometry: /* Geometry */ /* Geometry */ (/**
             * Point
             * Point Model
             */
            Point | /**
             * MultiPoint
             * MultiPoint Model
             */
            MultiPoint | /**
             * LineString
             * LineString Model
             */
            LineString | /**
             * MultiLineString
             * MultiLineString Model
             */
            MultiLineString | /**
             * Polygon
             * Polygon Model
             */
            Polygon | /**
             * MultiPolygon
             * MultiPolygon Model
             */
            MultiPolygon | /**
             * GeometryCollection
             * GeometryCollection Model
             */
            GeometryCollection) | null;
            /**
             * Properties
             */
            properties: /* Properties */ {
                [key: string]: any;
            } | /* BaseModel */ BaseModel | null;
            /**
             * Id
             */
            id?: /* Id */ number | string | null;
        }
        /**
         * FeatureCollection
         * FeatureCollection Model
         */
        export interface FeatureCollection {
            /**
             * Bbox
             */
            bbox?: /* Bbox */ any[] | any[] | null;
            /**
             * Type
             */
            type: "FeatureCollection";
            /**
             * Features
             */
            features: /**
             * Feature
             * Feature Model
             */
            Feature[];
        }
        /**
         * GeometryCollection
         * GeometryCollection Model
         */
        export interface GeometryCollection {
            /**
             * Bbox
             */
            bbox?: /* Bbox */ any[] | any[] | null;
            /**
             * Type
             */
            type: "GeometryCollection";
            /**
             * Geometries
             */
            geometries: (/**
             * Point
             * Point Model
             */
            Point | /**
             * MultiPoint
             * MultiPoint Model
             */
            MultiPoint | /**
             * LineString
             * LineString Model
             */
            LineString | /**
             * MultiLineString
             * MultiLineString Model
             */
            MultiLineString | /**
             * Polygon
             * Polygon Model
             */
            Polygon | /**
             * MultiPolygon
             * MultiPolygon Model
             */
            MultiPolygon | /**
             * GeometryCollection
             * GeometryCollection Model
             */
            GeometryCollection)[];
        }
        /**
         * Industry
         */
        export type Industry = "academic" | "nonprofit" | "government" | "media" | "finance" | "business" | "other";
        /**
         * Input
         */
        export interface Input {
            /**
             * Limit
             */
            limit?: number;
            /**
             * Offset
             */
            offset?: number;
        }
        /**
         * Instrument
         */
        export type Instrument = "GAO" | "ang" | "emi" | "tan" | "ssc";
        /**
         * LineString
         * LineString Model
         */
        export interface LineString {
            /**
             * Bbox
             */
            bbox?: /* Bbox */ any[] | any[] | null;
            /**
             * Type
             */
            type: "LineString";
            /**
             * Coordinates
             */
            coordinates: [
                (any[] | any[]),
                (any[] | any[]),
                ...(any[] | any[])[]
            ];
        }
        /**
         * MultiLineString
         * MultiLineString Model
         */
        export interface MultiLineString {
            /**
             * Bbox
             */
            bbox?: /* Bbox */ any[] | any[] | null;
            /**
             * Type
             */
            type: "MultiLineString";
            /**
             * Coordinates
             */
            coordinates: [
                (any[] | any[]),
                (any[] | any[]),
                ...(any[] | any[])[]
            ][];
        }
        /**
         * MultiPoint
         * MultiPoint Model
         */
        export interface MultiPoint {
            /**
             * Bbox
             */
            bbox?: /* Bbox */ any[] | any[] | null;
            /**
             * Type
             */
            type: "MultiPoint";
            /**
             * Coordinates
             */
            coordinates: (any[] | any[])[];
        }
        /**
         * MultiPolygon
         * MultiPolygon Model
         */
        export interface MultiPolygon {
            /**
             * Bbox
             */
            bbox?: /* Bbox */ any[] | any[] | null;
            /**
             * Type
             */
            type: "MultiPolygon";
            /**
             * Coordinates
             */
            coordinates: [
                (any[] | any[]),
                (any[] | any[]),
                (any[] | any[]),
                (any[] | any[]),
                ...(any[] | any[])[]
            ][][];
        }
        /**
         * OAuthRedirectResponse
         */
        export interface OAuthRedirectResponse {
            /**
             * Id Token
             */
            id_token: string;
            /**
             * Session State
             */
            session_state: string;
            /**
             * State
             */
            state: string;
        }
        /**
         * PagedAoiOut
         */
        export interface PagedAoiOut {
            /**
             * Items
             */
            items: /* AoiOut */ AoiOut[];
            /**
             * Count
             */
            count: number;
        }
        /**
         * PagedAssignmentOut
         */
        export interface PagedAssignmentOut {
            /**
             * Items
             */
            items: /* AssignmentOut */ AssignmentOut[];
            /**
             * Count
             */
            count: number;
        }
        /**
         * PagedPlumeAnnotatedOut
         */
        export interface PagedPlumeAnnotatedOut {
            /**
             * Bbox Count
             */
            bbox_count: number;
            /**
             * Total Count
             */
            total_count: number;
            /**
             * Limit
             */
            limit: number;
            /**
             * Offset
             */
            offset: number;
            /**
             * Items
             */
            items: /* PlumeAnnotatedOut */ PlumeAnnotatedOut[];
            /**
             * Nearby Items
             */
            nearby_items: /* PlumeAnnotatedOut */ PlumeAnnotatedOut[];
        }
        /**
         * PagedPlumeRelatedOut
         */
        export interface PagedPlumeRelatedOut {
            /**
             * Bbox Count
             */
            bbox_count: number;
            /**
             * Total Count
             */
            total_count: number;
            /**
             * Limit
             */
            limit: number;
            /**
             * Offset
             */
            offset: number;
            /**
             * Items
             */
            items: /* PlumeRelatedOut */ PlumeRelatedOut[];
        }
        /**
         * PagedSceneOut
         */
        export interface PagedSceneOut {
            /**
             * Items
             */
            items: /* SceneOut */ SceneOut[];
            /**
             * Count
             */
            count: number;
        }
        /**
         * PagedSearchRequestOut
         */
        export interface PagedSearchRequestOut {
            /**
             * Items
             */
            items: /* SearchRequestOut */ SearchRequestOut[];
            /**
             * Count
             */
            count: number;
        }
        /**
         * PatchPlumeIn
         */
        export interface PatchPlumeIn {
            geometry_json?: /**
             * Point
             * Point Model
             */
            Point | null;
            /**
             * Notes
             */
            notes?: /* Notes */ string | null;
            /**
             * Status
             */
            status?: string;
            /**
             * Quality
             */
            quality?: string;
            /**
             * Shape
             */
            quality_shape?: /* Shape */ boolean | null;
            /**
             * Intersects Artifacts
             */
            quality_artifacts?: /* Intersects Artifacts */ boolean | null;
            /**
             * Intersects Flare
             */
            quality_flare?: /* Intersects Flare */ boolean | null;
            /**
             * High Background Enhancement
             */
            quality_background?: /* High Background Enhancement */ boolean | null;
            /**
             * PHME Candidate
             */
            phme_candidate?: /* PHME Candidate */ boolean | null;
            /**
             * Sector
             */
            sector?: /* Sector */ string | null;
            /**
             * Hide Emission
             */
            hide_emission?: /* Hide Emission */ boolean | null;
            /**
             * Gas
             */
            gas?: /* Gas */ string | null;
            /**
             * Asset
             */
            asset_id?: /* Asset */ string /* uuid */ | null;
        }
        /**
         * PickerSceneOut
         */
        export interface PickerSceneOut {
            /**
             * Name
             */
            name: string;
        }
        /**
         * PlumeAnnotatedOut
         */
        export interface PlumeAnnotatedOut {
            /**
             * Id
             */
            id: string; // uuid
            /**
             * Plume Id
             */
            plume_id: string;
            /**
             * Gas
             */
            gas: string;
            geometry_json?: /**
             * Point
             * Point Model
             */
            Point | null;
            /**
             * Scene Id
             */
            scene_id?: /* Scene Id */ string /* uuid */ | null;
            /**
             * Scene Timestamp
             */
            scene_timestamp?: /* Scene Timestamp */ string /* date-time */ | null;
            /**
             * Instrument
             */
            instrument?: /* Instrument */ string | null;
            /**
             * Platform
             */
            platform?: /* Platform */ string | null;
            /**
             * Emission Auto
             */
            emission_auto?: /* Emission Auto */ number | null;
            /**
             * Emission Uncertainty Auto
             */
            emission_uncertainty_auto?: /* Emission Uncertainty Auto */ number | null;
            /**
             * Plume Png
             */
            plume_png?: /* Plume Png */ string | null;
            /**
             * Plume Rgb Png
             */
            plume_rgb_png?: /* Plume Rgb Png */ string | null;
            /**
             * Plume Tif
             */
            plume_tif?: /* Plume Tif */ string | null;
            /**
             * Rgb Png
             */
            rgb_png?: /* Rgb Png */ string | null;
            /**
             * Plume Bounds
             */
            plume_bounds?: /* Plume Bounds */ number[] | null;
            plume_quality?: /* Quality */ Quality | null;
            /**
             * Wind Speed Avg Auto
             */
            wind_speed_avg_auto?: /* Wind Speed Avg Auto */ number | null;
            /**
             * Wind Direction Avg Auto
             */
            wind_direction_avg_auto?: /* Wind Direction Avg Auto */ number | null;
            /**
             * Collection
             */
            collection?: /* Collection */ string | null;
            /**
             * CMF Type
             */
            cmf_type?: /* CMF Type */ string | null;
            /**
             * Sector
             */
            sector?: /* Sector */ string | null;
            /**
             * Status
             */
            status?: string;
            /**
             * Hide Emission
             */
            hide_emission?: /* Hide Emission */ boolean | null;
            /**
             * Published At
             */
            published_at?: /* Published At */ string /* date-time */ | null;
        }
        /**
         * PlumeCSVColumn
         */
        export type PlumeCSVColumn = "plume_id" | "plume_latitude" | "plume_longitude" | "datetime" | "ipcc_sector" | "gas" | "cmf_type" | "plume_bounds" | "instrument" | "published_at" | "plume_png_object" | "plume_tif_object" | "rgb_png_object" | "rgb_tif_object" | "emission_auto" | "emission_uncertainty_auto" | "wind_speed_avg_auto" | "wind_speed_std_auto" | "wind_direction_avg_auto" | "wind_direction_std_auto" | "wind_source_auto" | "plume_tif" | "plume_png" | "rgb_tif" | "rgb_png";
        /**
         * PlumeCSVColumnFilter
         */
        export interface PlumeCSVColumnFilter {
            /**
             * Exclude Columns
             */
            exclude_columns?: ("plume_id" | "plume_latitude" | "plume_longitude" | "datetime" | "ipcc_sector" | "gas" | "cmf_type" | "plume_bounds" | "instrument" | "published_at" | "plume_png_object" | "plume_tif_object" | "rgb_png_object" | "rgb_tif_object" | "emission_auto" | "emission_uncertainty_auto" | "wind_speed_avg_auto" | "wind_speed_std_auto" | "wind_direction_avg_auto" | "wind_direction_std_auto" | "wind_source_auto" | "plume_tif" | "plume_png" | "rgb_tif" | "rgb_png")[];
        }
        /**
         * PlumeEmissionOut
         */
        export interface PlumeEmissionOut {
            /**
             * Emission Auto
             */
            emission_auto?: /* Emission Auto */ number | null;
            /**
             * Emission Uncertainty Auto
             */
            emission_uncertainty_auto?: /* Emission Uncertainty Auto */ number | null;
            /**
             * Wind Source Auto
             */
            wind_source_auto?: /* Wind Source Auto */ string | null;
            /**
             * Emission
             */
            emission?: /* Emission */ number | null;
            /**
             * Emission Uncertainty
             */
            emission_uncertainty?: /* Emission Uncertainty */ number | null;
            /**
             * Wind Speed Avg
             */
            wind_speed_avg?: /* Wind Speed Avg */ number | null;
            /**
             * Wind Speed Std
             */
            wind_speed_std?: /* Wind Speed Std */ number | null;
            /**
             * Wind Direction Avg
             */
            wind_direction_avg?: /* Wind Direction Avg */ number | null;
            /**
             * Wind Direction Std
             */
            wind_direction_std?: /* Wind Direction Std */ number | null;
            /**
             * Wind Source
             */
            wind_source?: /* Wind Source */ string | null;
            /**
             * Emission Forecast
             */
            emission_forecast?: /* Emission Forecast */ number | null;
            /**
             * Emission Uncertainty Forecast
             */
            emission_uncertainty_forecast?: /* Emission Uncertainty Forecast */ number | null;
            /**
             * Wind Speed Avg Forecast
             */
            wind_speed_avg_forecast?: /* Wind Speed Avg Forecast */ number | null;
            /**
             * Wind Speed Std Forecast
             */
            wind_speed_std_forecast?: /* Wind Speed Std Forecast */ number | null;
            /**
             * Wind Direction Avg Forecast
             */
            wind_direction_avg_forecast?: /* Wind Direction Avg Forecast */ number | null;
            /**
             * Wind Direction Std Forecast
             */
            wind_direction_std_forecast?: /* Wind Direction Std Forecast */ number | null;
            /**
             * Wind Source Forecast
             */
            wind_source_forecast?: /* Wind Source Forecast */ string | null;
            /**
             * Status
             */
            status?: /* Status */ string | null;
            /**
             * Collection
             */
            collection: string;
            /**
             * Plume Ime
             */
            plume_ime?: /* Plume Ime */ string /* uuid */ | null;
            /**
             * Id
             */
            id?: string; // uuid
        }
        /**
         * PlumeFilterSchema
         */
        export interface PlumeFilterSchema {
            /**
             * Plume Ids
             */
            plume_ids?: /* Plume Ids */ string[] | null;
            /**
             * Plume Names
             */
            plume_names?: /* Plume Names */ string[] | null;
            /**
             * Scene Name
             */
            scene_name?: /* Scene Name */ string | null;
            /**
             * Scene Id
             */
            scene_id?: /* Scene Id */ string | null;
            /**
             * Scene Ids
             */
            scene_ids?: /* Scene Ids */ string[] | null;
            /**
             * Search
             */
            search?: /* Search */ string | null;
            /**
             * Emission Min
             */
            emission_min?: /* Emission Min */ number | null;
            /**
             * Emission Max
             */
            emission_max?: /* Emission Max */ number | null;
            /**
             * Sectors
             */
            sectors?: /* Sectors */ ("1B2" | "6A" | "6B" | "4B" | "1B1a" | "1A1" | "other" | "NULL" | "NA")[] | null;
            /**
             * Plume Gas
             */
            plume_gas?: /* Plume Gas */ ("CO2" | "CH4") | null;
            instrument?: /* Instrument */ Instrument | null;
            /**
             * Instruments
             */
            instruments?: /* Instruments */ /* Instrument */ Instrument[] | null;
            /**
             * Qualities
             */
            qualities?: /* Qualities */ /* Quality */ Quality[] | null;
            /**
             * Intersects
             */
            intersects?: /* Intersects */ string | null;
            /**
             * Has Phme
             */
            has_phme?: /* Has Phme */ boolean | null;
            /**
             * Published At Datetime
             */
            published_at_datetime?: /* Published At Datetime */ string | null;
            /**
             * Datetime
             */
            datetime?: /* Datetime */ string | null;
            /**
             * Source Name
             */
            source_name?: /* Source Name */ string | null;
        }
        /**
         * PlumeIMEOut
         */
        export interface PlumeIMEOut {
            /**
             * Images
             */
            images?: /* Images */ {
                [name: string]: {
                    [key: string]: any;
                };
            } | null;
            /**
             * Ime
             */
            ime?: /* Ime */ number | null;
            /**
             * Fetch
             */
            fetch?: /* Fetch */ number | null;
            /**
             * Ime Div Fetch Avg
             */
            ime_div_fetch_avg?: /* Ime Div Fetch Avg */ number | null;
            /**
             * Ime Div Fetch Std
             */
            ime_div_fetch_std?: /* Ime Div Fetch Std */ number | null;
            /**
             * Ime Avg
             */
            ime_avg?: /* Ime Avg */ number | null;
            /**
             * Ime Std
             */
            ime_std?: /* Ime Std */ number | null;
            /**
             * Fetch Avg
             */
            fetch_avg?: /* Fetch Avg */ number | null;
            /**
             * Fetch Std
             */
            fetch_std?: /* Fetch Std */ number | null;
            /**
             * Aspect Ratio
             */
            aspect_ratio?: /* Aspect Ratio */ number | null;
            /**
             * Aspect Ratio Flag
             */
            aspect_ratio_flag?: /* Aspect Ratio Flag */ boolean | null;
            /**
             * Status
             */
            status?: /* Status */ string | null;
            /**
             * Collection
             */
            collection: string;
            /**
             * Id
             */
            id?: string; // uuid
        }
        /**
         * PlumeIn
         */
        export interface PlumeIn {
            geometry_json: /**
             * Point
             * Point Model
             */
            Point;
            /**
             * Asset
             */
            asset_id?: /* Asset */ string /* uuid */ | null;
            /**
             * Scene
             */
            scene_id?: /* Scene */ string /* uuid */ | null;
            /**
             * Notes
             */
            notes?: /* Notes */ string | null;
            /**
             * Status
             */
            status?: string;
            /**
             * Gas
             */
            gas?: /* Gas */ string | null;
            /**
             * Quality
             */
            quality?: string;
            /**
             * Shape
             */
            quality_shape?: /* Shape */ boolean | null;
            /**
             * Intersects Artifacts
             */
            quality_artifacts?: /* Intersects Artifacts */ boolean | null;
            /**
             * Intersects Flare
             */
            quality_flare?: /* Intersects Flare */ boolean | null;
            /**
             * High Background Enhancement
             */
            quality_background?: /* High Background Enhancement */ boolean | null;
            /**
             * PHME Candidate
             */
            phme_candidate?: /* PHME Candidate */ boolean | null;
            /**
             * Sector
             */
            sector?: /* Sector */ string | null;
            /**
             * Hide Emission
             */
            hide_emission?: /* Hide Emission */ boolean | null;
        }
        /**
         * PlumeMutationOut
         */
        export interface PlumeMutationOut {
            /**
             * Id
             */
            id?: string; // uuid
        }
        /**
         * PlumeRelatedOut
         */
        export interface PlumeRelatedOut {
            /**
             * Id
             */
            id: string; // uuid
            quality?: /* Quality */ Quality | null;
            /**
             * Creator Email
             */
            creator_email?: /* Creator Email */ string | null;
            /**
             * Editor Email
             */
            editor_email?: /* Editor Email */ string | null;
            /**
             * Asset Type
             */
            asset_type?: /* Asset Type */ string | null;
            geometry_json: /**
             * Point
             * Point Model
             */
            Point;
            /**
             * Asset Id
             */
            asset_id?: string; // uuid
            /**
             * Scene Id
             */
            scene_id: string; // uuid
            /**
             * Scene Timestamp
             */
            scene_timestamp: string; // date-time
            /**
             * Plumeemission Set
             */
            plumeemission_set?: /* PlumeEmissionOut */ PlumeEmissionOut[];
            /**
             * Plumeime Set
             */
            plumeime_set?: /* PlumeIMEOut */ PlumeIMEOut[];
            /**
             * Plumevis Set
             */
            plumevis_set?: /* PlumeVisOut */ PlumeVisOut[];
            /**
             * Instrument
             */
            instrument?: string;
            /**
             * PlumeEmissionOut
             */
            default_emission_object?: {
                /**
                 * Emission Auto
                 */
                emission_auto?: /* Emission Auto */ number | null;
                /**
                 * Emission Uncertainty Auto
                 */
                emission_uncertainty_auto?: /* Emission Uncertainty Auto */ number | null;
                /**
                 * Wind Source Auto
                 */
                wind_source_auto?: /* Wind Source Auto */ string | null;
                /**
                 * Emission
                 */
                emission?: /* Emission */ number | null;
                /**
                 * Emission Uncertainty
                 */
                emission_uncertainty?: /* Emission Uncertainty */ number | null;
                /**
                 * Wind Speed Avg
                 */
                wind_speed_avg?: /* Wind Speed Avg */ number | null;
                /**
                 * Wind Speed Std
                 */
                wind_speed_std?: /* Wind Speed Std */ number | null;
                /**
                 * Wind Direction Avg
                 */
                wind_direction_avg?: /* Wind Direction Avg */ number | null;
                /**
                 * Wind Direction Std
                 */
                wind_direction_std?: /* Wind Direction Std */ number | null;
                /**
                 * Wind Source
                 */
                wind_source?: /* Wind Source */ string | null;
                /**
                 * Emission Forecast
                 */
                emission_forecast?: /* Emission Forecast */ number | null;
                /**
                 * Emission Uncertainty Forecast
                 */
                emission_uncertainty_forecast?: /* Emission Uncertainty Forecast */ number | null;
                /**
                 * Wind Speed Avg Forecast
                 */
                wind_speed_avg_forecast?: /* Wind Speed Avg Forecast */ number | null;
                /**
                 * Wind Speed Std Forecast
                 */
                wind_speed_std_forecast?: /* Wind Speed Std Forecast */ number | null;
                /**
                 * Wind Direction Avg Forecast
                 */
                wind_direction_avg_forecast?: /* Wind Direction Avg Forecast */ number | null;
                /**
                 * Wind Direction Std Forecast
                 */
                wind_direction_std_forecast?: /* Wind Direction Std Forecast */ number | null;
                /**
                 * Wind Source Forecast
                 */
                wind_source_forecast?: /* Wind Source Forecast */ string | null;
                /**
                 * Status
                 */
                status?: /* Status */ string | null;
                /**
                 * Collection
                 */
                collection: string;
                /**
                 * Plume Ime
                 */
                plume_ime?: /* Plume Ime */ string /* uuid */ | null;
                /**
                 * Id
                 */
                id?: string; // uuid
            };
            /**
             * PlumeIMEOut
             */
            default_ime_object?: {
                /**
                 * Images
                 */
                images?: /* Images */ {
                    [name: string]: {
                        [key: string]: any;
                    };
                } | null;
                /**
                 * Ime
                 */
                ime?: /* Ime */ number | null;
                /**
                 * Fetch
                 */
                fetch?: /* Fetch */ number | null;
                /**
                 * Ime Div Fetch Avg
                 */
                ime_div_fetch_avg?: /* Ime Div Fetch Avg */ number | null;
                /**
                 * Ime Div Fetch Std
                 */
                ime_div_fetch_std?: /* Ime Div Fetch Std */ number | null;
                /**
                 * Ime Avg
                 */
                ime_avg?: /* Ime Avg */ number | null;
                /**
                 * Ime Std
                 */
                ime_std?: /* Ime Std */ number | null;
                /**
                 * Fetch Avg
                 */
                fetch_avg?: /* Fetch Avg */ number | null;
                /**
                 * Fetch Std
                 */
                fetch_std?: /* Fetch Std */ number | null;
                /**
                 * Aspect Ratio
                 */
                aspect_ratio?: /* Aspect Ratio */ number | null;
                /**
                 * Aspect Ratio Flag
                 */
                aspect_ratio_flag?: /* Aspect Ratio Flag */ boolean | null;
                /**
                 * Status
                 */
                status?: /* Status */ string | null;
                /**
                 * Collection
                 */
                collection: string;
                /**
                 * Id
                 */
                id?: string; // uuid
            };
            /**
             * PlumeVisOut
             */
            default_vis_object?: {
                /**
                 * Images
                 */
                images?: /* Images */ {
                    [name: string]: {
                        [key: string]: any;
                    };
                } | null;
                /**
                 * Status
                 */
                status?: /* Status */ string | null;
                /**
                 * Collection
                 */
                collection: string;
                /**
                 * Id
                 */
                id?: string; // uuid
            };
            /**
             * Gas
             */
            gas?: /* Gas */ string | null;
            /**
             * Alphabetic ID
             */
            ascii_id?: /* Alphabetic ID */ string | null;
            /**
             * Bounds
             */
            bounds?: /* Bounds */ any[] | null;
            /**
             * CMF Type
             */
            cmf_type?: /* CMF Type */ string | null;
            /**
             * Emission
             */
            emission?: /* Emission */ string /* uuid */ | null;
            /**
             * Hide Emission
             */
            hide_emission?: /* Hide Emission */ boolean | null;
            /**
             * Notes
             */
            notes?: /* Notes */ string | null;
            /**
             * Numeric ID
             */
            number_id?: /* Numeric ID */ number | null;
            /**
             * PHME Candidate
             */
            phme_candidate?: /* PHME Candidate */ boolean | null;
            /**
             * Plume Id
             */
            plume_id: string;
            /**
             * Published At
             */
            published_at?: /* Published At */ string /* date-time */ | null;
            /**
             * Intersects Artifacts
             */
            quality_artifacts?: /* Intersects Artifacts */ boolean | null;
            /**
             * High Background Enhancement
             */
            quality_background?: /* High Background Enhancement */ boolean | null;
            /**
             * Intersects Flare
             */
            quality_flare?: /* Intersects Flare */ boolean | null;
            /**
             * Shape
             */
            quality_shape?: /* Shape */ boolean | null;
            /**
             * Sector
             */
            sector?: /* Sector */ string | null;
            /**
             * Status
             */
            status?: string;
        }
        /**
         * PlumeSource
         */
        export interface PlumeSource {
            /**
             * Plumes
             */
            plumes: /* PlumeAnnotatedOut */ PlumeAnnotatedOut[];
            /**
             * Scenes
             */
            scenes: /* PlumeSourceScene */ PlumeSourceScene[];
            point: /**
             * Point
             * Point Model
             */
            Point;
            /**
             * Source Name
             */
            source_name: string;
            /**
             * Source
             */
            source: {
                [key: string]: any;
            };
            /**
             * Observation Dates
             */
            observation_dates: string[];
            /**
             * Detection Dates
             */
            detection_dates: string[];
        }
        /**
         * PlumeSourceScene
         */
        export interface PlumeSourceScene {
            /**
             * Id
             */
            id: string; // uuid
            /**
             * Name
             */
            name: string;
            /**
             * Timestamp
             */
            timestamp: string; // date-time
            instrument: /* Instrument */ Instrument;
        }
        /**
         * PlumeVisOut
         */
        export interface PlumeVisOut {
            /**
             * Images
             */
            images?: /* Images */ {
                [name: string]: {
                    [key: string]: any;
                };
            } | null;
            /**
             * Status
             */
            status?: /* Status */ string | null;
            /**
             * Collection
             */
            collection: string;
            /**
             * Id
             */
            id?: string; // uuid
        }
        /**
         * Point
         * Point Model
         */
        export interface Point {
            /**
             * Bbox
             */
            bbox?: /* Bbox */ any[] | any[] | null;
            /**
             * Type
             */
            type: "Point";
            /**
             * Coordinates
             */
            coordinates: /* Coordinates */ any[] | any[];
        }
        /**
         * Polygon
         * Polygon Model
         */
        export interface Polygon {
            /**
             * Bbox
             */
            bbox?: /* Bbox */ any[] | any[] | null;
            /**
             * Type
             */
            type: "Polygon";
            /**
             * Coordinates
             */
            coordinates: [
                (any[] | any[]),
                (any[] | any[]),
                (any[] | any[]),
                (any[] | any[]),
                ...(any[] | any[])[]
            ][];
        }
        /**
         * Quality
         */
        export type Quality = "good" | "questionable" | "bad";
        /**
         * RegistrationIn
         */
        export interface RegistrationIn {
            /**
             * Email Address
             */
            email: string;
            /**
             * Password1
             */
            password1: string;
            /**
             * Password2
             */
            password2: string;
            /**
             * First Name
             */
            first_name: string;
            /**
             * Last Name
             */
            last_name: string;
            /**
             * Organization
             */
            organization?: /* Organization */ string | null;
            /**
             * Title
             */
            title?: /* Title */ string | null;
            industry?: /* Industry */ Industry | null;
            usage?: /* Usage */ Usage | null;
            /**
             * Notes
             */
            notes?: /* Notes */ string | null;
        }
        /**
         * RegistrationVerificationIn
         */
        export interface RegistrationVerificationIn {
            /**
             * Uidb64
             */
            uidb64: string;
            /**
             * Token
             */
            token: string;
        }
        /**
         * ReportIn
         */
        export interface ReportIn {
            /**
             * Email
             */
            email: string;
            /**
             * Topic
             */
            topic: string;
            /**
             * Message
             */
            message: string;
        }
        /**
         * RequestPasswordResetIn
         */
        export interface RequestPasswordResetIn {
            /**
             * Email Address
             */
            email: string;
        }
        /**
         * SceneAssessmentIn
         */
        export interface SceneAssessmentIn {
            /**
             * Scene Assessment Status Id
             */
            scene_assessment_status_id?: /* Scene Assessment Status Id */ number | null;
            /**
             * Scene Id
             */
            scene_id: string;
            /**
             * Image Artifacts
             */
            image_artifacts?: {
                [key: string]: any;
            };
            /**
             * Low Snr
             */
            low_snr?: boolean;
            /**
             * Geolocation Error
             */
            geolocation_error?: /* Geolocation Error */ boolean | null;
            /**
             * Atmospheric Artifacts
             */
            atmospheric_artifacts?: {
                [key: string]: any;
            };
            /**
             * Note
             */
            note?: /* Note */ string | null;
            /**
             * Cloud Cover %
             */
            cloud_cover_pct?: /* Cloud Cover % */ number | null;
        }
        /**
         * SceneAssessmentOut
         */
        export interface SceneAssessmentOut {
            /**
             * Id
             */
            id: number;
            /**
             * User
             */
            user?: /* User */ number | null;
            /**
             * Image Artifacts
             */
            image_artifacts?: {
                [key: string]: any;
            };
            /**
             * Low Snr
             */
            low_snr?: boolean;
            /**
             * Geolocation Error
             */
            geolocation_error?: /* Geolocation Error */ boolean | null;
            /**
             * Atmospheric Artifacts
             */
            atmospheric_artifacts?: {
                [key: string]: any;
            };
            /**
             * Cloud Cover %
             */
            cloud_cover_pct?: /* Cloud Cover % */ number | null;
            /**
             * Note
             */
            note?: /* Note */ string | null;
        }
        /**
         * SceneDetailOut
         */
        export interface SceneDetailOut {
            /**
             * Usersceneassignmentstatus Set
             */
            usersceneassignmentstatus_set?: /* UserSceneAssignmentStatusOut */ UserSceneAssignmentStatusOut[];
            /**
             * Bounds
             */
            bounds?: /* Bounds */ number[] | null;
            instrument?: /* Instrument */ Instrument | null;
            /**
             * Plume Count
             */
            plume_count: number;
            /**
             * Deleted Plume Count
             */
            deleted_plume_count: number;
            /**
             * Hidden Plume Count
             */
            hidden_plume_count: number;
            /**
             * Assignment Count
             */
            assignment_count: number;
            /**
             * Assessment Count
             */
            assessment_count: number;
            /**
             * Published Plume Count
             */
            published_plume_count: number;
            /**
             * Id
             */
            id?: string; // uuid
            /**
             * Name
             */
            name: string;
            /**
             * Timestamp
             */
            timestamp: string; // date-time
            /**
             * Quick Look
             */
            quick_look?: boolean;
        }
        /**
         * SceneFilterSchema
         */
        export interface SceneFilterSchema {
            /**
             * Ids
             */
            ids?: /* Ids */ string[] | null;
            /**
             * Search
             */
            search?: /* Search */ string | null;
            /**
             * Hasassignees
             */
            hasAssignees?: /* Hasassignees */ boolean | null;
            /**
             * Assignees
             */
            assignees?: /* Assignees */ number[] | null;
            /**
             * Assignment Status
             */
            assignment_status?: /* Assignment Status */ ("To Do" | "In Progress" | "Done" | "Failed" | "Deleted") | null;
            /**
             * Assessment Status
             */
            assessment_status?: /* Assessment Status */ ("assessed" | "not-assessed" | "do-not-assess") | "exclude-do-not-assess" | null;
            /**
             * Assignment Modified Datetime
             */
            assignment_modified_datetime?: /* Assignment Modified Datetime */ string | null;
            /**
             * Plume Quality
             */
            plume_quality?: /* Plume Quality */ ("any" | "good" | "questionable" | "bad") | null;
            /**
             * Plume Gas
             */
            plume_gas?: /* Plume Gas */ ("CO2" | "CH4") | null;
            instrument?: /* Instrument */ Instrument | null;
            /**
             * Cloud Cover Pct Min
             */
            cloud_cover_pct_min?: number;
            /**
             * Cloud Cover Pct Max
             */
            cloud_cover_pct_max?: number;
            assessment_cloud_cover_pct?: /* CloudCover */ CloudCover | null;
            /**
             * Has Plume Emissions
             */
            has_plume_emissions?: /* Has Plume Emissions */ boolean | null;
            /**
             * Has Phme
             */
            has_phme?: /* Has Phme */ boolean | null;
            /**
             * Plume Emission Min
             */
            plume_emission_min?: /* Plume Emission Min */ number | null;
            /**
             * Plume Emission Max
             */
            plume_emission_max?: /* Plume Emission Max */ number | null;
            /**
             * Plume Statuses
             */
            plume_statuses?: /* Plume Statuses */ ("not_deleted" | "published" | "publish_ready" | "valid" | "deleted" | "hidden")[] | null;
            /**
             * Plume Sectors
             */
            plume_sectors?: /* Plume Sectors */ ("1B2" | "6A" | "6B" | "4B" | "1B1a" | "1A1" | "other" | "NULL" | "NA")[] | null;
            /**
             * Is Quick Look
             */
            is_quick_look?: /* Is Quick Look */ boolean | null;
            /**
             * Bbox
             */
            bbox?: /* Bbox */ any[] | null;
            /**
             * Datetime
             */
            datetime?: /* Datetime */ string | null;
        }
        /**
         * SceneOut
         */
        export interface SceneOut {
            /**
             * Id
             */
            id: string; // uuid
            /**
             * Usersceneassignmentstatus Set
             */
            usersceneassignmentstatus_set?: /* UserSceneAssignmentStatusOut */ UserSceneAssignmentStatusOut[];
            /**
             * Bounds
             */
            bounds?: /* Bounds */ number[] | null;
            /**
             * Previews
             */
            previews?: /* Previews */ {
                [name: string]: {
                    [name: string]: string;
                };
            } | null;
            /**
             * Plume Count
             */
            plume_count: number;
            /**
             * Deleted Plume Count
             */
            deleted_plume_count: number;
            /**
             * Hidden Plume Count
             */
            hidden_plume_count: number;
            /**
             * Assignment Count
             */
            assignment_count: number;
            /**
             * Assessment Count
             */
            assessment_count: number;
            /**
             * Published Plume Count
             */
            published_plume_count: number;
            /**
             * Assessment Status
             */
            assessment_status?: /* Assessment Status */ string | null;
            /**
             * Timestamp
             */
            timestamp: string; // date-time
            /**
             * Quick Look
             */
            quick_look?: boolean;
            /**
             * Published At
             */
            published_at?: /* Published At */ string /* date-time */ | null;
            /**
             * Modified
             */
            modified: string; // date-time
            /**
             * Created
             */
            created: string; // date-time
            /**
             * Platform
             */
            platform?: /* Platform */ string | null;
            /**
             * Instrument
             */
            instrument: string;
            /**
             * Name
             */
            name: string;
            /**
             * Cloud Cover %
             */
            cloud_cover_pct?: /* Cloud Cover % */ number | null;
        }
        /**
         * Schema
         */
        export interface Schema {
        }
        /**
         * SearchRequestIn
         */
        export interface SearchRequestIn {
            /**
             * Aoi Id
             */
            aoi_id?: string; // uuid
            /**
             * Name
             */
            name?: /* Name */ string | null;
            /**
             * Query
             */
            query?: {
                [key: string]: any;
            };
            /**
             * Source Name
             */
            source_name?: /* Source Name */ string | null;
            /**
             * Change Detection Enable
             */
            change_detection_enable?: /* Change Detection Enable */ boolean | null;
            /**
             * Change Detection Schedule
             */
            change_detection_schedule?: /* Change Detection Schedule */ string | null;
        }
        /**
         * SearchRequestOut
         */
        export interface SearchRequestOut {
            source_point_json: /**
             * Point
             * Point Model
             */
            Point | null;
            /**
             * Id
             */
            id?: string; // uuid
            /**
             * User
             */
            user: number;
            /**
             * Aoi
             */
            aoi?: /* Aoi */ string /* uuid */ | null;
            /**
             * Query
             */
            query?: {
                [key: string]: any;
            };
            /**
             * Name
             */
            name?: /* Name */ string | null;
            /**
             * Source Name
             */
            source_name?: /* Source Name */ string | null;
            /**
             * Source Gas
             */
            source_gas?: /* Source Gas */ string | null;
            /**
             * Source Sector
             */
            source_sector?: /* Source Sector */ string | null;
            /**
             * Source Eps
             */
            source_eps?: /* Source Eps */ number | null;
            /**
             * Change Detection Enable
             */
            change_detection_enable?: /* Change Detection Enable */ boolean | null;
            /**
             * Change Detection Schedule
             */
            change_detection_schedule?: /* Change Detection Schedule */ string | null;
            /**
             * Created
             */
            created: string; // date-time
            /**
             * Modified
             */
            modified: string; // date-time
        }
        /**
         * SetPasswordIn
         */
        export interface SetPasswordIn {
            /**
             * New Password1
             */
            new_password1: string;
            /**
             * New Password2
             */
            new_password2: string;
            /**
             * Uidb64
             */
            uidb64: string;
            /**
             * Token
             */
            token: string;
        }
        /**
         * SourceAggregation
         */
        export interface SourceAggregation {
            /**
             * Persistence Avg
             */
            persistence_avg?: /* Persistence Avg */ number | null;
            /**
             * Emission Sum
             */
            emission_sum?: /* Emission Sum */ number | null;
            /**
             * Emission Uncertainty Sum
             */
            emission_uncertainty_sum?: /* Emission Uncertainty Sum */ number | null;
            /**
             * Emission Avg
             */
            emission_avg?: /* Emission Avg */ number | null;
            /**
             * Emission Uncertainty Avg
             */
            emission_uncertainty_avg?: /* Emission Uncertainty Avg */ number | null;
            /**
             * Emission Std
             */
            emission_std?: /* Emission Std */ number | null;
            /**
             * Emission Uncertainty Std
             */
            emission_uncertainty_std?: /* Emission Uncertainty Std */ number | null;
            /**
             * Plume Count
             */
            plume_count?: number;
            /**
             * Single Plume Count
             */
            single_plume_count?: number;
            /**
             * Sector
             */
            sector?: /* Sector */ string | null;
        }
        /**
         * StacSearchParams
         * This class represents STAC API core GET parameters
         * source:
         * https://github.com/radiantearth/stac-api-spec/tree/main/item-search#query-parameter-table
         */
        export interface StacSearchParams {
            /**
             * Limit
             */
            limit?: number;
            /**
             * Bbox
             */
            bbox?: /* Bbox */ string | null;
            /**
             * Datetime
             */
            datetime?: /* Datetime */ string | null;
            /**
             * Intersects
             */
            intersects?: /* Intersects */ string | null;
            /**
             * Ids
             */
            ids?: /* Ids */ string[] | null;
            /**
             * Collections
             */
            collections?: /* Collections */ string[] | null;
        }
        /**
         * Status
         */
        export type Status = "To Do" | "In Progress" | "Done" | "Failed" | "Deleted";
        /**
         * TokenRefreshInputSchema
         */
        export interface TokenRefreshInputSchema {
            /**
             * Refresh
             */
            refresh: string;
        }
        /**
         * TokenRefreshOutputSchema
         */
        export interface TokenRefreshOutputSchema {
            /**
             * Refresh
             */
            refresh: string;
            /**
             * Access
             */
            access: /* Access */ string | null;
        }
        /**
         * TokenVerifyInputSchema
         */
        export interface TokenVerifyInputSchema {
            /**
             * Token
             */
            token: string;
        }
        /**
         * UpdateUserSceneAssignmentStatusIn
         */
        export interface UpdateUserSceneAssignmentStatusIn {
            status: /* Status */ Status;
        }
        /**
         * Usage
         */
        export type Usage = "personal-research" | "work-related-research" | "developer" | "other";
        /**
         * UserIn
         * User is created via registration, only.
         * This schema is used for PATCH, so fields are not required.
         */
        export interface UserIn {
            /**
             * Organization
             */
            organization?: /* Organization */ string | null;
            /**
             * Title
             */
            title?: /* Title */ string | null;
            /**
             * Industry
             */
            industry?: /* Industry */ string | null;
            /**
             * Usage
             */
            usage?: /* Usage */ string | null;
            /**
             * Notes
             */
            notes?: /* Notes */ string | null;
            /**
             * Change Detection Enable
             */
            change_detection_enable?: /* Change Detection Enable */ boolean | null;
            /**
             * Change Detection Schedule
             */
            change_detection_schedule?: /* Change Detection Schedule */ string | null;
        }
        /**
         * UserOut
         */
        export interface UserOut {
            /**
             * Label
             */
            label: string;
            /**
             * ID
             */
            id?: /* ID */ number | null;
            /**
             * Last Login
             */
            last_login?: /* Last Login */ string /* date-time */ | null;
            /**
             * Superuser Status
             * Designates that this user has all permissions without explicitly assigning them.
             */
            is_superuser?: boolean;
            /**
             * First Name
             */
            first_name?: /* First Name */ string | null;
            /**
             * Last Name
             */
            last_name?: /* Last Name */ string | null;
            /**
             * Staff Status
             * Designates whether the user can log into this admin site.
             */
            is_staff?: boolean;
            /**
             * Active
             * Designates whether this user should be treated as active. Unselect this instead of deleting accounts.
             */
            is_active?: boolean;
            /**
             * Date Joined
             */
            date_joined?: string; // date-time
            /**
             * Email Address
             */
            email: string;
            /**
             * Updated At
             */
            updated_at: string; // date-time
            /**
             * Organization
             */
            organization?: /* Organization */ string | null;
            /**
             * Title
             */
            title?: /* Title */ string | null;
            /**
             * Industry
             */
            industry?: /* Industry */ string | null;
            /**
             * Usage
             */
            usage?: /* Usage */ string | null;
            /**
             * Notes
             */
            notes?: /* Notes */ string | null;
            /**
             * Change Detection Enable
             */
            change_detection_enable?: boolean;
            /**
             * Change Detection Schedule
             */
            change_detection_schedule?: /* Change Detection Schedule */ string | null;
            /**
             * Groups
             * The groups this user belongs to. A user will get all permissions granted to each of their groups.
             */
            groups: number[];
            /**
             * User Permissions
             * Specific permissions for this user.
             */
            user_permissions: number[];
        }
        /**
         * UserSceneAssignmentStatusOut
         */
        export interface UserSceneAssignmentStatusOut {
            /**
             * Pk
             */
            pk: number;
            user: /* BasicUserOut */ BasicUserOut;
            /**
             * Scene Id
             */
            scene_id?: string; // uuid
            scene: /* PickerSceneOut */ PickerSceneOut;
            assignment?: /* BasicAssignmentOut */ BasicAssignmentOut | null;
            /**
             * Note
             */
            note?: /* Note */ string | null;
            /**
             * Status
             */
            status?: /* Status */ string | null;
            /**
             * Created
             */
            created: string; // date-time
            /**
             * Modified
             */
            modified: string; // date-time
        }
        /**
         * UserWithMetricsOut
         */
        export interface UserWithMetricsOut {
            /**
             * Label
             */
            label: string;
            /**
             * Plume Count
             */
            plume_count: number;
            /**
             * Scene Assignment Count
             */
            scene_assignment_count: number;
            /**
             * ID
             */
            id?: /* ID */ number | null;
            /**
             * Email Address
             */
            email: string;
        }
    }
}
declare namespace Paths {
    namespace $0baa2f95ControllerRefreshToken {
        export type RequestBody = /* TokenRefreshInputSchema */ Components.Schemas.TokenRefreshInputSchema;
        namespace Responses {
            export type $200 = /* TokenRefreshOutputSchema */ Components.Schemas.TokenRefreshOutputSchema;
        }
    }
    namespace $6075077eControllerVerifyToken {
        export type RequestBody = /* TokenVerifyInputSchema */ Components.Schemas.TokenVerifyInputSchema;
        namespace Responses {
            export type $200 = /* Schema */ Components.Schemas.Schema;
        }
    }
    namespace AccountApiReportReport {
        export type RequestBody = /* ReportIn */ Components.Schemas.ReportIn;
        namespace Responses {
            /**
             * Response
             */
            export type $200 = string;
        }
    }
    namespace AccountApiReportUsersWithMetrics {
        namespace Responses {
            /**
             * Response
             */
            export type $200 = /* UserWithMetricsOut */ Components.Schemas.UserWithMetricsOut[];
        }
    }
    namespace AccountApiSearchRequestSearchRequestCreate {
        export type RequestBody = /* SearchRequestIn */ Components.Schemas.SearchRequestIn;
        namespace Responses {
            export type $200 = /* SearchRequestOut */ Components.Schemas.SearchRequestOut;
        }
    }
    namespace AccountApiSearchRequestSearchRequestDelete {
        namespace Parameters {
            /**
             * Pk
             */
            export type Pk = string;
        }
        export interface PathParameters {
            pk: /* Pk */ Parameters.Pk;
        }
        namespace Responses {
            /**
             * Response
             */
            export type $200 = string;
            /**
             * Response
             */
            export interface $404 {
            }
        }
    }
    namespace AccountApiSearchRequestSearchRequestGet {
        namespace Parameters {
            /**
             * Pk
             */
            export type Pk = string;
        }
        export interface PathParameters {
            pk: /* Pk */ Parameters.Pk;
        }
        namespace Responses {
            export type $200 = /* SearchRequestOut */ Components.Schemas.SearchRequestOut;
        }
    }
    namespace AccountApiSearchRequestSearchRequestList {
        namespace Parameters {
            /**
             * Limit
             */
            export type Limit = number;
            /**
             * Offset
             */
            export type Offset = number;
        }
        export interface QueryParameters {
            limit?: /* Limit */ Parameters.Limit;
            offset?: /* Offset */ Parameters.Offset;
        }
        namespace Responses {
            export type $200 = /* PagedSearchRequestOut */ Components.Schemas.PagedSearchRequestOut;
        }
    }
    namespace AccountApiSearchRequestSearchRequestPatch {
        namespace Parameters {
            /**
             * Pk
             */
            export type Pk = string;
        }
        export interface PathParameters {
            pk: /* Pk */ Parameters.Pk;
        }
        export type RequestBody = /* SearchRequestIn */ Components.Schemas.SearchRequestIn;
        namespace Responses {
            export type $200 = /* SearchRequestOut */ Components.Schemas.SearchRequestOut;
            /**
             * Response
             */
            export interface $404 {
            }
        }
    }
    namespace AccountApiSearchRequestSearchRequestPut {
        namespace Parameters {
            /**
             * Pk
             */
            export type Pk = string;
        }
        export interface PathParameters {
            pk: /* Pk */ Parameters.Pk;
        }
        export type RequestBody = /* SearchRequestIn */ Components.Schemas.SearchRequestIn;
        namespace Responses {
            export type $200 = /* SearchRequestOut */ Components.Schemas.SearchRequestOut;
            /**
             * Response
             */
            export interface $404 {
            }
        }
    }
    namespace AccountApiTokenTokensCreateStac {
        namespace Responses {
            /**
             * Response
             */
            export interface $200 {
            }
            export type $401 = /* ErrorsOut */ Components.Schemas.ErrorsOut;
        }
    }
    namespace AccountApiUserChangePassword {
        export type RequestBody = /* ChangePasswordIn */ Components.Schemas.ChangePasswordIn;
        namespace Responses {
            export interface $200 {
            }
            export interface $204 {
            }
            export type $403 = /* ErrorsOut */ Components.Schemas.ErrorsOut;
        }
    }
    namespace AccountApiUserMe {
        namespace Responses {
            export type $200 = /* UserOut */ Components.Schemas.UserOut;
        }
    }
    namespace AccountApiUserMePatch {
        export type RequestBody = /**
         * UserIn
         * User is created via registration, only.
         * This schema is used for PATCH, so fields are not required.
         */
        Components.Schemas.UserIn;
        namespace Responses {
            export type $200 = /* UserOut */ Components.Schemas.UserOut;
        }
    }
    namespace AccountApiUserOauth {
        export type RequestBody = /* OAuthRedirectResponse */ Components.Schemas.OAuthRedirectResponse;
        namespace Responses {
            export type $200 = /* CustomTokenObtainPairOutSchema */ Components.Schemas.CustomTokenObtainPairOutSchema;
            export type $403 = /* ErrorsOut */ Components.Schemas.ErrorsOut;
        }
    }
    namespace AccountApiUserRegister {
        export type RequestBody = /* RegistrationIn */ Components.Schemas.RegistrationIn;
        namespace Responses {
            export interface $200 {
            }
            export interface $204 {
            }
            export type $403 = /* ErrorsOut */ Components.Schemas.ErrorsOut;
        }
    }
    namespace AccountApiUserRegisterVerify {
        export type RequestBody = /* RegistrationVerificationIn */ Components.Schemas.RegistrationVerificationIn;
        namespace Responses {
            export interface $200 {
            }
            export interface $204 {
            }
            export type $403 = /* ErrorsOut */ Components.Schemas.ErrorsOut;
        }
    }
    namespace AccountApiUserRequestPasswordReset {
        export type RequestBody = /* RequestPasswordResetIn */ Components.Schemas.RequestPasswordResetIn;
        namespace Responses {
            export interface $200 {
            }
            export interface $204 {
            }
            export type $403 = /* ErrorsOut */ Components.Schemas.ErrorsOut;
        }
    }
    namespace AccountApiUserResetPassword {
        export type RequestBody = /* SetPasswordIn */ Components.Schemas.SetPasswordIn;
        namespace Responses {
            export type $200 = /* UserOut */ Components.Schemas.UserOut;
            export type $403 = /* ErrorsOut */ Components.Schemas.ErrorsOut;
            export interface $422 {
            }
        }
    }
    namespace AccountApiUserUser {
        namespace Parameters {
            /**
             * User Id
             */
            export type UserId = number;
        }
        export interface PathParameters {
            user_id: /* User Id */ Parameters.UserId;
        }
        namespace Responses {
            export type $200 = /* UserOut */ Components.Schemas.UserOut;
        }
    }
    namespace AccountApiUserUserPatch {
        namespace Parameters {
            /**
             * User Id
             */
            export type UserId = number;
        }
        export interface PathParameters {
            user_id: /* User Id */ Parameters.UserId;
        }
        export type RequestBody = /**
         * UserIn
         * User is created via registration, only.
         * This schema is used for PATCH, so fields are not required.
         */
        Components.Schemas.UserIn;
        namespace Responses {
            export type $200 = /* UserOut */ Components.Schemas.UserOut;
        }
    }
    namespace AccountApiUserUserScenesCsv {
        namespace Parameters {
            /**
             * User Id
             */
            export type UserId = number;
        }
        export interface PathParameters {
            user_id: /* User Id */ Parameters.UserId;
        }
        namespace Responses {
            /**
             * Response
             */
            export type $200 = string;
        }
    }
    namespace AccountApiUserUsers {
        namespace Responses {
            /**
             * Response
             */
            export type $200 = /* UserOut */ Components.Schemas.UserOut[];
        }
    }
    namespace CatalogApiCatalogListObjects {
        namespace Parameters {
            /**
             * Prefix
             */
            export type Prefix = string;
        }
        export interface QueryParameters {
            prefix?: /* Prefix */ Parameters.Prefix;
        }
        namespace Responses {
            export interface $200 {
            }
        }
    }
    namespace CatalogApiCatalogSignedUrl {
        namespace Parameters {
            /**
             * S3Path
             */
            export type S3path = string;
        }
        export interface QueryParameters {
            s3path: /* S3Path */ Parameters.S3path;
        }
        namespace Responses {
            export interface $200 {
            }
        }
    }
    namespace CatalogApiCatalogTree {
        namespace Parameters {
            /**
             * Prefix
             */
            export type Prefix = string;
        }
        export interface QueryParameters {
            prefix?: /* Prefix */ Parameters.Prefix;
        }
        namespace Responses {
            export interface $200 {
            }
        }
    }
    namespace CatalogApiPlumePlumeCreate {
        export type RequestBody = /* PlumeIn */ Components.Schemas.PlumeIn;
        namespace Responses {
            export type $200 = /* PlumeMutationOut */ Components.Schemas.PlumeMutationOut;
        }
    }
    namespace CatalogApiPlumePlumeCsv {
        namespace Parameters {
            /**
             * Bbox
             */
            export type Bbox = /* Bbox */ any[] | null;
            /**
             * Datetime
             */
            export type Datetime = /* Datetime */ string | null;
            /**
             * Emission Max
             */
            export type EmissionMax = /* Emission Max */ number | null;
            /**
             * Emission Min
             */
            export type EmissionMin = /* Emission Min */ number | null;
            /**
             * Exclude Columns
             */
            export type ExcludeColumns = ("plume_id" | "plume_latitude" | "plume_longitude" | "datetime" | "ipcc_sector" | "gas" | "cmf_type" | "plume_bounds" | "instrument" | "published_at" | "plume_png_object" | "plume_tif_object" | "rgb_png_object" | "rgb_tif_object" | "emission_auto" | "emission_uncertainty_auto" | "wind_speed_avg_auto" | "wind_speed_std_auto" | "wind_direction_avg_auto" | "wind_direction_std_auto" | "wind_source_auto" | "plume_tif" | "plume_png" | "rgb_tif" | "rgb_png")[];
            /**
             * Has Phme
             */
            export type HasPhme = /* Has Phme */ boolean | null;
            export type Instrument = /* Instrument */ Components.Schemas.Instrument | null;
            /**
             * Instruments
             */
            export type Instruments = /* Instruments */ /* Instrument */ Components.Schemas.Instrument[] | null;
            /**
             * Intersects
             */
            export type Intersects = /* Intersects */ string | null;
            /**
             * Limit
             */
            export type Limit = number;
            /**
             * Offset
             */
            export type Offset = number;
            /**
             * Plume Gas
             */
            export type PlumeGas = /* Plume Gas */ ("CO2" | "CH4") | null;
            /**
             * Plume Ids
             */
            export type PlumeIds = /* Plume Ids */ string[] | null;
            /**
             * Plume Names
             */
            export type PlumeNames = /* Plume Names */ string[] | null;
            /**
             * Published At Datetime
             */
            export type PublishedAtDatetime = /* Published At Datetime */ string | null;
            /**
             * Qualities
             */
            export type Qualities = /* Qualities */ /* Quality */ Components.Schemas.Quality[] | null;
            /**
             * Scene Id
             */
            export type SceneId = /* Scene Id */ string | null;
            /**
             * Scene Ids
             */
            export type SceneIds = /* Scene Ids */ string[] | null;
            /**
             * Scene Name
             */
            export type SceneName = /* Scene Name */ string | null;
            /**
             * Search
             */
            export type Search = /* Search */ string | null;
            /**
             * Sectors
             */
            export type Sectors = /* Sectors */ ("1B2" | "6A" | "6B" | "4B" | "1B1a" | "1A1" | "other" | "NULL" | "NA")[] | null;
            /**
             * Sort
             */
            export type Sort = "asc" | "desc" | "emissions_desc" | "emissions_asc" | "published_desc" | "published_asc";
            /**
             * Source Name
             */
            export type SourceName = /* Source Name */ string | null;
            /**
             * Status
             */
            export type Status = /* Status */ ("not_deleted" | "published" | "publish_ready" | "valid" | "deleted" | "hidden") | null;
        }
        export interface QueryParameters {
            bbox?: /* Bbox */ Parameters.Bbox;
            plume_ids?: /* Plume Ids */ Parameters.PlumeIds;
            plume_names?: /* Plume Names */ Parameters.PlumeNames;
            scene_name?: /* Scene Name */ Parameters.SceneName;
            scene_id?: /* Scene Id */ Parameters.SceneId;
            scene_ids?: /* Scene Ids */ Parameters.SceneIds;
            search?: /* Search */ Parameters.Search;
            emission_min?: /* Emission Min */ Parameters.EmissionMin;
            emission_max?: /* Emission Max */ Parameters.EmissionMax;
            sectors?: /* Sectors */ Parameters.Sectors;
            plume_gas?: /* Plume Gas */ Parameters.PlumeGas;
            instrument?: Parameters.Instrument;
            instruments?: /* Instruments */ Parameters.Instruments;
            qualities?: /* Qualities */ Parameters.Qualities;
            intersects?: /* Intersects */ Parameters.Intersects;
            has_phme?: /* Has Phme */ Parameters.HasPhme;
            published_at_datetime?: /* Published At Datetime */ Parameters.PublishedAtDatetime;
            datetime?: /* Datetime */ Parameters.Datetime;
            source_name?: /* Source Name */ Parameters.SourceName;
            exclude_columns?: /* Exclude Columns */ Parameters.ExcludeColumns;
            status?: /* Status */ Parameters.Status;
            sort?: /* Sort */ Parameters.Sort;
            limit?: /* Limit */ Parameters.Limit;
            offset?: /* Offset */ Parameters.Offset;
        }
        namespace Responses {
            /**
             * Response
             */
            export type $200 = string;
        }
    }
    namespace CatalogApiPlumePlumeGet {
        namespace Parameters {
            /**
             * Plume Id
             */
            export type PlumeId = string;
        }
        export interface PathParameters {
            plume_id: /* Plume Id */ Parameters.PlumeId;
        }
        namespace Responses {
            export type $200 = /* PlumeAnnotatedOut */ Components.Schemas.PlumeAnnotatedOut;
            /**
             * Response
             */
            export interface $404 {
            }
        }
    }
    namespace CatalogApiPlumePlumeListAnnotated {
        namespace Parameters {
            /**
             * Bbox
             */
            export type Bbox = /* Bbox */ any[] | null;
            /**
             * Datetime
             */
            export type Datetime = /* Datetime */ string | null;
            /**
             * Emission Max
             */
            export type EmissionMax = /* Emission Max */ number | null;
            /**
             * Emission Min
             */
            export type EmissionMin = /* Emission Min */ number | null;
            /**
             * Has Phme
             */
            export type HasPhme = /* Has Phme */ boolean | null;
            export type Instrument = /* Instrument */ Components.Schemas.Instrument | null;
            /**
             * Instruments
             */
            export type Instruments = /* Instruments */ /* Instrument */ Components.Schemas.Instrument[] | null;
            /**
             * Intersects
             */
            export type Intersects = /* Intersects */ string | null;
            /**
             * Limit
             */
            export type Limit = number;
            /**
             * Offset
             */
            export type Offset = number;
            /**
             * Plume Gas
             */
            export type PlumeGas = /* Plume Gas */ ("CO2" | "CH4") | null;
            /**
             * Plume Ids
             */
            export type PlumeIds = /* Plume Ids */ string[] | null;
            /**
             * Plume Names
             */
            export type PlumeNames = /* Plume Names */ string[] | null;
            /**
             * Published At Datetime
             */
            export type PublishedAtDatetime = /* Published At Datetime */ string | null;
            /**
             * Qualities
             */
            export type Qualities = /* Qualities */ /* Quality */ Components.Schemas.Quality[] | null;
            /**
             * Scene Id
             */
            export type SceneId = /* Scene Id */ string | null;
            /**
             * Scene Ids
             */
            export type SceneIds = /* Scene Ids */ string[] | null;
            /**
             * Scene Name
             */
            export type SceneName = /* Scene Name */ string | null;
            /**
             * Search
             */
            export type Search = /* Search */ string | null;
            /**
             * Sectors
             */
            export type Sectors = /* Sectors */ ("1B2" | "6A" | "6B" | "4B" | "1B1a" | "1A1" | "other" | "NULL" | "NA")[] | null;
            /**
             * Sort
             */
            export type Sort = "asc" | "desc" | "emissions_desc" | "emissions_asc" | "published_desc" | "published_asc";
            /**
             * Source Name
             */
            export type SourceName = /* Source Name */ string | null;
            /**
             * Status
             */
            export type Status = /* Status */ ("not_deleted" | "published" | "publish_ready" | "valid" | "deleted" | "hidden") | null;
        }
        export interface QueryParameters {
            plume_ids?: /* Plume Ids */ Parameters.PlumeIds;
            plume_names?: /* Plume Names */ Parameters.PlumeNames;
            scene_name?: /* Scene Name */ Parameters.SceneName;
            scene_id?: /* Scene Id */ Parameters.SceneId;
            scene_ids?: /* Scene Ids */ Parameters.SceneIds;
            search?: /* Search */ Parameters.Search;
            emission_min?: /* Emission Min */ Parameters.EmissionMin;
            emission_max?: /* Emission Max */ Parameters.EmissionMax;
            sectors?: /* Sectors */ Parameters.Sectors;
            plume_gas?: /* Plume Gas */ Parameters.PlumeGas;
            instrument?: Parameters.Instrument;
            instruments?: /* Instruments */ Parameters.Instruments;
            qualities?: /* Qualities */ Parameters.Qualities;
            intersects?: /* Intersects */ Parameters.Intersects;
            has_phme?: /* Has Phme */ Parameters.HasPhme;
            published_at_datetime?: /* Published At Datetime */ Parameters.PublishedAtDatetime;
            datetime?: /* Datetime */ Parameters.Datetime;
            source_name?: /* Source Name */ Parameters.SourceName;
            status?: /* Status */ Parameters.Status;
            sort?: /* Sort */ Parameters.Sort;
            limit?: /* Limit */ Parameters.Limit;
            offset?: /* Offset */ Parameters.Offset;
            bbox?: /* Bbox */ Parameters.Bbox;
        }
        namespace Responses {
            export type $200 = /* PagedPlumeAnnotatedOut */ Components.Schemas.PagedPlumeAnnotatedOut;
        }
    }
    namespace CatalogApiPlumePlumeListRelated {
        namespace Parameters {
            /**
             * Bbox
             */
            export type Bbox = /* Bbox */ any[] | null;
            /**
             * Datetime
             */
            export type Datetime = /* Datetime */ string | null;
            /**
             * Emission Max
             */
            export type EmissionMax = /* Emission Max */ number | null;
            /**
             * Emission Min
             */
            export type EmissionMin = /* Emission Min */ number | null;
            /**
             * Has Phme
             */
            export type HasPhme = /* Has Phme */ boolean | null;
            export type Instrument = /* Instrument */ Components.Schemas.Instrument | null;
            /**
             * Instruments
             */
            export type Instruments = /* Instruments */ /* Instrument */ Components.Schemas.Instrument[] | null;
            /**
             * Intersects
             */
            export type Intersects = /* Intersects */ string | null;
            /**
             * Limit
             */
            export type Limit = number;
            /**
             * Offset
             */
            export type Offset = number;
            /**
             * Plume Gas
             */
            export type PlumeGas = /* Plume Gas */ ("CO2" | "CH4") | null;
            /**
             * Plume Ids
             */
            export type PlumeIds = /* Plume Ids */ string[] | null;
            /**
             * Plume Names
             */
            export type PlumeNames = /* Plume Names */ string[] | null;
            /**
             * Published At Datetime
             */
            export type PublishedAtDatetime = /* Published At Datetime */ string | null;
            /**
             * Qualities
             */
            export type Qualities = /* Qualities */ /* Quality */ Components.Schemas.Quality[] | null;
            /**
             * Scene Id
             */
            export type SceneId = /* Scene Id */ string | null;
            /**
             * Scene Ids
             */
            export type SceneIds = /* Scene Ids */ string[] | null;
            /**
             * Scene Name
             */
            export type SceneName = /* Scene Name */ string | null;
            /**
             * Search
             */
            export type Search = /* Search */ string | null;
            /**
             * Sectors
             */
            export type Sectors = /* Sectors */ ("1B2" | "6A" | "6B" | "4B" | "1B1a" | "1A1" | "other" | "NULL" | "NA")[] | null;
            /**
             * Sort
             */
            export type Sort = "asc" | "desc" | "emissions_desc" | "emissions_asc" | "published_desc" | "published_asc";
            /**
             * Source Name
             */
            export type SourceName = /* Source Name */ string | null;
            /**
             * Status
             */
            export type Status = /* Status */ ("not_deleted" | "published" | "publish_ready" | "valid" | "deleted" | "hidden") | null;
        }
        export interface QueryParameters {
            plume_ids?: /* Plume Ids */ Parameters.PlumeIds;
            plume_names?: /* Plume Names */ Parameters.PlumeNames;
            scene_name?: /* Scene Name */ Parameters.SceneName;
            scene_id?: /* Scene Id */ Parameters.SceneId;
            scene_ids?: /* Scene Ids */ Parameters.SceneIds;
            search?: /* Search */ Parameters.Search;
            emission_min?: /* Emission Min */ Parameters.EmissionMin;
            emission_max?: /* Emission Max */ Parameters.EmissionMax;
            sectors?: /* Sectors */ Parameters.Sectors;
            plume_gas?: /* Plume Gas */ Parameters.PlumeGas;
            instrument?: Parameters.Instrument;
            instruments?: /* Instruments */ Parameters.Instruments;
            qualities?: /* Qualities */ Parameters.Qualities;
            intersects?: /* Intersects */ Parameters.Intersects;
            has_phme?: /* Has Phme */ Parameters.HasPhme;
            published_at_datetime?: /* Published At Datetime */ Parameters.PublishedAtDatetime;
            datetime?: /* Datetime */ Parameters.Datetime;
            source_name?: /* Source Name */ Parameters.SourceName;
            status?: /* Status */ Parameters.Status;
            sort?: /* Sort */ Parameters.Sort;
            limit?: /* Limit */ Parameters.Limit;
            offset?: /* Offset */ Parameters.Offset;
            bbox?: /* Bbox */ Parameters.Bbox;
        }
        namespace Responses {
            export type $200 = /* PagedPlumeRelatedOut */ Components.Schemas.PagedPlumeRelatedOut;
        }
    }
    namespace CatalogApiPlumePlumePatch {
        namespace Parameters {
            /**
             * Plume Id
             */
            export type PlumeId = string;
        }
        export interface PathParameters {
            plume_id: /* Plume Id */ Parameters.PlumeId;
        }
        export type RequestBody = /* PatchPlumeIn */ Components.Schemas.PatchPlumeIn;
        namespace Responses {
            export type $200 = /* PlumeMutationOut */ Components.Schemas.PlumeMutationOut;
        }
    }
    namespace CatalogApiPlumePlumeStats {
        namespace Parameters {
            /**
             * Datetime
             */
            export type Datetime = /* Datetime */ string | null;
            /**
             * Emission Max
             */
            export type EmissionMax = /* Emission Max */ number | null;
            /**
             * Emission Min
             */
            export type EmissionMin = /* Emission Min */ number | null;
            /**
             * Has Phme
             */
            export type HasPhme = /* Has Phme */ boolean | null;
            export type Instrument = /* Instrument */ Components.Schemas.Instrument | null;
            /**
             * Instruments
             */
            export type Instruments = /* Instruments */ /* Instrument */ Components.Schemas.Instrument[] | null;
            /**
             * Intersects
             */
            export type Intersects = /* Intersects */ string | null;
            /**
             * Plume Gas
             */
            export type PlumeGas = /* Plume Gas */ ("CO2" | "CH4") | null;
            /**
             * Plume Ids
             */
            export type PlumeIds = /* Plume Ids */ string[] | null;
            /**
             * Plume Names
             */
            export type PlumeNames = /* Plume Names */ string[] | null;
            /**
             * Published At Datetime
             */
            export type PublishedAtDatetime = /* Published At Datetime */ string | null;
            /**
             * Qualities
             */
            export type Qualities = /* Qualities */ /* Quality */ Components.Schemas.Quality[] | null;
            /**
             * Scene Id
             */
            export type SceneId = /* Scene Id */ string | null;
            /**
             * Scene Ids
             */
            export type SceneIds = /* Scene Ids */ string[] | null;
            /**
             * Scene Name
             */
            export type SceneName = /* Scene Name */ string | null;
            /**
             * Search
             */
            export type Search = /* Search */ string | null;
            /**
             * Sectors
             */
            export type Sectors = /* Sectors */ ("1B2" | "6A" | "6B" | "4B" | "1B1a" | "1A1" | "other" | "NULL" | "NA")[] | null;
            /**
             * Source Name
             */
            export type SourceName = /* Source Name */ string | null;
            /**
             * Status
             */
            export type Status = /* Status */ ("not_deleted" | "published" | "publish_ready" | "valid" | "deleted" | "hidden") | null;
        }
        export interface QueryParameters {
            plume_ids?: /* Plume Ids */ Parameters.PlumeIds;
            plume_names?: /* Plume Names */ Parameters.PlumeNames;
            scene_name?: /* Scene Name */ Parameters.SceneName;
            scene_id?: /* Scene Id */ Parameters.SceneId;
            scene_ids?: /* Scene Ids */ Parameters.SceneIds;
            search?: /* Search */ Parameters.Search;
            emission_min?: /* Emission Min */ Parameters.EmissionMin;
            emission_max?: /* Emission Max */ Parameters.EmissionMax;
            sectors?: /* Sectors */ Parameters.Sectors;
            plume_gas?: /* Plume Gas */ Parameters.PlumeGas;
            instrument?: Parameters.Instrument;
            instruments?: /* Instruments */ Parameters.Instruments;
            qualities?: /* Qualities */ Parameters.Qualities;
            intersects?: /* Intersects */ Parameters.Intersects;
            has_phme?: /* Has Phme */ Parameters.HasPhme;
            published_at_datetime?: /* Published At Datetime */ Parameters.PublishedAtDatetime;
            datetime?: /* Datetime */ Parameters.Datetime;
            source_name?: /* Source Name */ Parameters.SourceName;
            status?: /* Status */ Parameters.Status;
        }
        namespace Responses {
            /**
             * Response
             */
            export type $200 = string;
        }
    }
    namespace CatalogApiPlumePlumeUpdate {
        namespace Parameters {
            /**
             * Plume Id
             */
            export type PlumeId = string;
        }
        export interface PathParameters {
            plume_id: /* Plume Id */ Parameters.PlumeId;
        }
        export type RequestBody = /* PlumeIn */ Components.Schemas.PlumeIn;
        namespace Responses {
            export type $200 = /* PlumeMutationOut */ Components.Schemas.PlumeMutationOut;
        }
    }
    namespace CatalogApiPlumePublishPlumes {
        namespace Parameters {
            /**
             * Bbox
             */
            export type Bbox = /* Bbox */ any[] | null;
            /**
             * Datetime
             */
            export type Datetime = /* Datetime */ string | null;
            /**
             * Emission Max
             */
            export type EmissionMax = /* Emission Max */ number | null;
            /**
             * Emission Min
             */
            export type EmissionMin = /* Emission Min */ number | null;
            /**
             * Has Phme
             */
            export type HasPhme = /* Has Phme */ boolean | null;
            export type Instrument = /* Instrument */ Components.Schemas.Instrument | null;
            /**
             * Instruments
             */
            export type Instruments = /* Instruments */ /* Instrument */ Components.Schemas.Instrument[] | null;
            /**
             * Intersects
             */
            export type Intersects = /* Intersects */ string | null;
            /**
             * Plume Gas
             */
            export type PlumeGas = /* Plume Gas */ ("CO2" | "CH4") | null;
            /**
             * Plume Ids
             */
            export type PlumeIds = /* Plume Ids */ string[] | null;
            /**
             * Plume Names
             */
            export type PlumeNames = /* Plume Names */ string[] | null;
            /**
             * Published At Datetime
             */
            export type PublishedAtDatetime = /* Published At Datetime */ string | null;
            /**
             * Qualities
             */
            export type Qualities = /* Qualities */ /* Quality */ Components.Schemas.Quality[] | null;
            /**
             * Scene Id
             */
            export type SceneId = /* Scene Id */ string | null;
            /**
             * Scene Ids
             */
            export type SceneIds = /* Scene Ids */ string[] | null;
            /**
             * Scene Name
             */
            export type SceneName = /* Scene Name */ string | null;
            /**
             * Search
             */
            export type Search = /* Search */ string | null;
            /**
             * Sectors
             */
            export type Sectors = /* Sectors */ ("1B2" | "6A" | "6B" | "4B" | "1B1a" | "1A1" | "other" | "NULL" | "NA")[] | null;
            /**
             * Source Name
             */
            export type SourceName = /* Source Name */ string | null;
            /**
             * Status
             */
            export type Status = /* Status */ ("not_deleted" | "published" | "publish_ready" | "valid" | "deleted" | "hidden") | null;
        }
        export interface QueryParameters {
            bbox?: /* Bbox */ Parameters.Bbox;
            plume_ids?: /* Plume Ids */ Parameters.PlumeIds;
            plume_names?: /* Plume Names */ Parameters.PlumeNames;
            scene_name?: /* Scene Name */ Parameters.SceneName;
            scene_id?: /* Scene Id */ Parameters.SceneId;
            scene_ids?: /* Scene Ids */ Parameters.SceneIds;
            search?: /* Search */ Parameters.Search;
            emission_min?: /* Emission Min */ Parameters.EmissionMin;
            emission_max?: /* Emission Max */ Parameters.EmissionMax;
            sectors?: /* Sectors */ Parameters.Sectors;
            plume_gas?: /* Plume Gas */ Parameters.PlumeGas;
            instrument?: Parameters.Instrument;
            instruments?: /* Instruments */ Parameters.Instruments;
            qualities?: /* Qualities */ Parameters.Qualities;
            intersects?: /* Intersects */ Parameters.Intersects;
            has_phme?: /* Has Phme */ Parameters.HasPhme;
            published_at_datetime?: /* Published At Datetime */ Parameters.PublishedAtDatetime;
            datetime?: /* Datetime */ Parameters.Datetime;
            source_name?: /* Source Name */ Parameters.SourceName;
            status?: /* Status */ Parameters.Status;
        }
        namespace Responses {
            /**
             * Response
             */
            export type $200 = string;
        }
    }
    namespace CatalogApiSceneMqlSceneCount {
        namespace Responses {
            /**
             * Response
             */
            export type $200 = number;
        }
    }
    namespace CatalogApiSceneSceneGet {
        namespace Parameters {
            /**
             * Scene Id
             */
            export type SceneId = string;
        }
        export interface PathParameters {
            scene_id: /* Scene Id */ Parameters.SceneId;
        }
        namespace Responses {
            export type $200 = /* SceneDetailOut */ Components.Schemas.SceneDetailOut;
        }
    }
    namespace CatalogApiSceneScenes {
        namespace Parameters {
            export type AssessmentCloudCoverPct = /* CloudCover */ Components.Schemas.CloudCover | null;
            /**
             * Assessment Status
             */
            export type AssessmentStatus = /* Assessment Status */ ("assessed" | "not-assessed" | "do-not-assess") | "exclude-do-not-assess" | null;
            /**
             * Assignees
             */
            export type Assignees = /* Assignees */ number[] | null;
            /**
             * Assignment Modified Datetime
             */
            export type AssignmentModifiedDatetime = /* Assignment Modified Datetime */ string | null;
            /**
             * Assignment Status
             */
            export type AssignmentStatus = /* Assignment Status */ ("To Do" | "In Progress" | "Done" | "Failed" | "Deleted") | null;
            /**
             * Bbox
             */
            export type Bbox = /* Bbox */ any[] | null;
            /**
             * Cloud Cover Pct Max
             */
            export type CloudCoverPctMax = number;
            /**
             * Cloud Cover Pct Min
             */
            export type CloudCoverPctMin = number;
            /**
             * Datetime
             */
            export type Datetime = /* Datetime */ string | null;
            /**
             * Hasassignees
             */
            export type HasAssignees = /* Hasassignees */ boolean | null;
            /**
             * Has Phme
             */
            export type HasPhme = /* Has Phme */ boolean | null;
            /**
             * Has Plume Emissions
             */
            export type HasPlumeEmissions = /* Has Plume Emissions */ boolean | null;
            /**
             * Ids
             */
            export type Ids = /* Ids */ string[] | null;
            export type Instrument = /* Instrument */ Components.Schemas.Instrument | null;
            /**
             * Is Quick Look
             */
            export type IsQuickLook = /* Is Quick Look */ boolean | null;
            /**
             * Limit
             */
            export type Limit = number;
            /**
             * Offset
             */
            export type Offset = number;
            /**
             * Plume Emission Max
             */
            export type PlumeEmissionMax = /* Plume Emission Max */ number | null;
            /**
             * Plume Emission Min
             */
            export type PlumeEmissionMin = /* Plume Emission Min */ number | null;
            /**
             * Plume Gas
             */
            export type PlumeGas = /* Plume Gas */ ("CO2" | "CH4") | null;
            /**
             * Plume Quality
             */
            export type PlumeQuality = /* Plume Quality */ ("any" | "good" | "questionable" | "bad") | null;
            /**
             * Plume Sectors
             */
            export type PlumeSectors = /* Plume Sectors */ ("1B2" | "6A" | "6B" | "4B" | "1B1a" | "1A1" | "other" | "NULL" | "NA")[] | null;
            /**
             * Plume Statuses
             */
            export type PlumeStatuses = /* Plume Statuses */ ("not_deleted" | "published" | "publish_ready" | "valid" | "deleted" | "hidden")[] | null;
            /**
             * Search
             */
            export type Search = /* Search */ string | null;
            /**
             * Sort
             */
            export type Sort = "asc" | "desc" | "priority";
        }
        export interface QueryParameters {
            sort?: /* Sort */ Parameters.Sort;
            ids?: /* Ids */ Parameters.Ids;
            search?: /* Search */ Parameters.Search;
            hasAssignees?: /* Hasassignees */ Parameters.HasAssignees;
            assignees?: /* Assignees */ Parameters.Assignees;
            assignment_status?: /* Assignment Status */ Parameters.AssignmentStatus;
            assessment_status?: /* Assessment Status */ Parameters.AssessmentStatus;
            assignment_modified_datetime?: /* Assignment Modified Datetime */ Parameters.AssignmentModifiedDatetime;
            plume_quality?: /* Plume Quality */ Parameters.PlumeQuality;
            plume_gas?: /* Plume Gas */ Parameters.PlumeGas;
            instrument?: Parameters.Instrument;
            cloud_cover_pct_min?: /* Cloud Cover Pct Min */ Parameters.CloudCoverPctMin;
            cloud_cover_pct_max?: /* Cloud Cover Pct Max */ Parameters.CloudCoverPctMax;
            assessment_cloud_cover_pct?: Parameters.AssessmentCloudCoverPct;
            has_plume_emissions?: /* Has Plume Emissions */ Parameters.HasPlumeEmissions;
            has_phme?: /* Has Phme */ Parameters.HasPhme;
            plume_emission_min?: /* Plume Emission Min */ Parameters.PlumeEmissionMin;
            plume_emission_max?: /* Plume Emission Max */ Parameters.PlumeEmissionMax;
            plume_statuses?: /* Plume Statuses */ Parameters.PlumeStatuses;
            plume_sectors?: /* Plume Sectors */ Parameters.PlumeSectors;
            is_quick_look?: /* Is Quick Look */ Parameters.IsQuickLook;
            bbox?: /* Bbox */ Parameters.Bbox;
            datetime?: /* Datetime */ Parameters.Datetime;
            limit?: /* Limit */ Parameters.Limit;
            offset?: /* Offset */ Parameters.Offset;
        }
        namespace Responses {
            export type $200 = /* PagedSceneOut */ Components.Schemas.PagedSceneOut;
        }
    }
    namespace CatalogApiSceneScenesCsv {
        namespace Parameters {
            export type AssessmentCloudCoverPct = /* CloudCover */ Components.Schemas.CloudCover | null;
            /**
             * Assessment Status
             */
            export type AssessmentStatus = /* Assessment Status */ ("assessed" | "not-assessed" | "do-not-assess") | "exclude-do-not-assess" | null;
            /**
             * Assignees
             */
            export type Assignees = /* Assignees */ number[] | null;
            /**
             * Assignment Modified Datetime
             */
            export type AssignmentModifiedDatetime = /* Assignment Modified Datetime */ string | null;
            /**
             * Assignment Status
             */
            export type AssignmentStatus = /* Assignment Status */ ("To Do" | "In Progress" | "Done" | "Failed" | "Deleted") | null;
            /**
             * Bbox
             */
            export type Bbox = /* Bbox */ any[] | null;
            /**
             * Cloud Cover Pct Max
             */
            export type CloudCoverPctMax = number;
            /**
             * Cloud Cover Pct Min
             */
            export type CloudCoverPctMin = number;
            /**
             * Datetime
             */
            export type Datetime = /* Datetime */ string | null;
            /**
             * Hasassignees
             */
            export type HasAssignees = /* Hasassignees */ boolean | null;
            /**
             * Has Phme
             */
            export type HasPhme = /* Has Phme */ boolean | null;
            /**
             * Has Plume Emissions
             */
            export type HasPlumeEmissions = /* Has Plume Emissions */ boolean | null;
            /**
             * Ids
             */
            export type Ids = /* Ids */ string[] | null;
            export type Instrument = /* Instrument */ Components.Schemas.Instrument | null;
            /**
             * Is Quick Look
             */
            export type IsQuickLook = /* Is Quick Look */ boolean | null;
            /**
             * Plume Emission Max
             */
            export type PlumeEmissionMax = /* Plume Emission Max */ number | null;
            /**
             * Plume Emission Min
             */
            export type PlumeEmissionMin = /* Plume Emission Min */ number | null;
            /**
             * Plume Gas
             */
            export type PlumeGas = /* Plume Gas */ ("CO2" | "CH4") | null;
            /**
             * Plume Quality
             */
            export type PlumeQuality = /* Plume Quality */ ("any" | "good" | "questionable" | "bad") | null;
            /**
             * Plume Sectors
             */
            export type PlumeSectors = /* Plume Sectors */ ("1B2" | "6A" | "6B" | "4B" | "1B1a" | "1A1" | "other" | "NULL" | "NA")[] | null;
            /**
             * Plume Statuses
             */
            export type PlumeStatuses = /* Plume Statuses */ ("not_deleted" | "published" | "publish_ready" | "valid" | "deleted" | "hidden")[] | null;
            /**
             * Search
             */
            export type Search = /* Search */ string | null;
            /**
             * Sort
             */
            export type Sort = "asc" | "desc" | "priority";
        }
        export interface QueryParameters {
            sort?: /* Sort */ Parameters.Sort;
            ids?: /* Ids */ Parameters.Ids;
            search?: /* Search */ Parameters.Search;
            hasAssignees?: /* Hasassignees */ Parameters.HasAssignees;
            assignees?: /* Assignees */ Parameters.Assignees;
            assignment_status?: /* Assignment Status */ Parameters.AssignmentStatus;
            assessment_status?: /* Assessment Status */ Parameters.AssessmentStatus;
            assignment_modified_datetime?: /* Assignment Modified Datetime */ Parameters.AssignmentModifiedDatetime;
            plume_quality?: /* Plume Quality */ Parameters.PlumeQuality;
            plume_gas?: /* Plume Gas */ Parameters.PlumeGas;
            instrument?: Parameters.Instrument;
            cloud_cover_pct_min?: /* Cloud Cover Pct Min */ Parameters.CloudCoverPctMin;
            cloud_cover_pct_max?: /* Cloud Cover Pct Max */ Parameters.CloudCoverPctMax;
            assessment_cloud_cover_pct?: Parameters.AssessmentCloudCoverPct;
            has_plume_emissions?: /* Has Plume Emissions */ Parameters.HasPlumeEmissions;
            has_phme?: /* Has Phme */ Parameters.HasPhme;
            plume_emission_min?: /* Plume Emission Min */ Parameters.PlumeEmissionMin;
            plume_emission_max?: /* Plume Emission Max */ Parameters.PlumeEmissionMax;
            plume_statuses?: /* Plume Statuses */ Parameters.PlumeStatuses;
            plume_sectors?: /* Plume Sectors */ Parameters.PlumeSectors;
            is_quick_look?: /* Is Quick Look */ Parameters.IsQuickLook;
            bbox?: /* Bbox */ Parameters.Bbox;
            datetime?: /* Datetime */ Parameters.Datetime;
        }
        namespace Responses {
            export type $200 = /**
             * FeatureCollection
             * FeatureCollection Model
             */
            Components.Schemas.FeatureCollection;
        }
    }
    namespace CatalogApiSceneScenesDates {
        namespace Responses {
            export interface $200 {
            }
        }
    }
    namespace CatalogApiSourcePlumeSource {
        namespace Parameters {
            /**
             * Datetime
             */
            export type Datetime = /* Datetime */ string | null;
            /**
             * Emission Max
             */
            export type EmissionMax = /* Emission Max */ number | null;
            /**
             * Emission Min
             */
            export type EmissionMin = /* Emission Min */ number | null;
            /**
             * Eps
             */
            export type Eps = number;
            /**
             * Has Phme
             */
            export type HasPhme = /* Has Phme */ boolean | null;
            export type Instrument = /* Instrument */ Components.Schemas.Instrument | null;
            /**
             * Instruments
             */
            export type Instruments = /* Instruments */ /* Instrument */ Components.Schemas.Instrument[] | null;
            /**
             * Intersects
             */
            export type Intersects = /* Intersects */ string | null;
            /**
             * Minpoints
             */
            export type Minpoints = number;
            /**
             * Plume Gas
             */
            export type PlumeGas = /* Plume Gas */ ("CO2" | "CH4") | null;
            /**
             * Plume Ids
             */
            export type PlumeIds = /* Plume Ids */ string[] | null;
            /**
             * Plume Names
             */
            export type PlumeNames = /* Plume Names */ string[] | null;
            /**
             * Plume Uuid
             */
            export type PlumeUuid = string;
            /**
             * Published At Datetime
             */
            export type PublishedAtDatetime = /* Published At Datetime */ string | null;
            /**
             * Qualities
             */
            export type Qualities = /* Qualities */ /* Quality */ Components.Schemas.Quality[] | null;
            /**
             * Scene Id
             */
            export type SceneId = /* Scene Id */ string | null;
            /**
             * Scene Ids
             */
            export type SceneIds = /* Scene Ids */ string[] | null;
            /**
             * Scene Name
             */
            export type SceneName = /* Scene Name */ string | null;
            /**
             * Search
             */
            export type Search = /* Search */ string | null;
            /**
             * Sectors
             */
            export type Sectors = /* Sectors */ ("1B2" | "6A" | "6B" | "4B" | "1B1a" | "1A1" | "other" | "NULL" | "NA")[] | null;
            /**
             * Source Name
             */
            export type SourceName = /* Source Name */ string | null;
            /**
             * Status
             */
            export type Status = "not_deleted" | "published" | "publish_ready" | "valid" | "deleted" | "hidden";
        }
        export interface PathParameters {
            plume_uuid: /* Plume Uuid */ Parameters.PlumeUuid;
        }
        export interface QueryParameters {
            plume_ids?: /* Plume Ids */ Parameters.PlumeIds;
            plume_names?: /* Plume Names */ Parameters.PlumeNames;
            scene_name?: /* Scene Name */ Parameters.SceneName;
            scene_id?: /* Scene Id */ Parameters.SceneId;
            scene_ids?: /* Scene Ids */ Parameters.SceneIds;
            search?: /* Search */ Parameters.Search;
            emission_min?: /* Emission Min */ Parameters.EmissionMin;
            emission_max?: /* Emission Max */ Parameters.EmissionMax;
            sectors?: /* Sectors */ Parameters.Sectors;
            plume_gas?: /* Plume Gas */ Parameters.PlumeGas;
            instrument?: Parameters.Instrument;
            instruments?: /* Instruments */ Parameters.Instruments;
            qualities?: /* Qualities */ Parameters.Qualities;
            intersects?: /* Intersects */ Parameters.Intersects;
            has_phme?: /* Has Phme */ Parameters.HasPhme;
            published_at_datetime?: /* Published At Datetime */ Parameters.PublishedAtDatetime;
            datetime?: /* Datetime */ Parameters.Datetime;
            source_name?: /* Source Name */ Parameters.SourceName;
            status?: /* Status */ Parameters.Status;
            eps?: /* Eps */ Parameters.Eps;
            minpoints?: /* Minpoints */ Parameters.Minpoints;
        }
        namespace Responses {
            export type $200 = /* PlumeSource */ Components.Schemas.PlumeSource;
            /**
             * Response
             */
            export type $404 = any;
        }
    }
    namespace CatalogApiSourcePlumeSourceName {
        namespace Parameters {
            /**
             * Datetime
             */
            export type Datetime = /* Datetime */ string | null;
            /**
             * Emission Max
             */
            export type EmissionMax = /* Emission Max */ number | null;
            /**
             * Emission Min
             */
            export type EmissionMin = /* Emission Min */ number | null;
            /**
             * Eps
             */
            export type Eps = number;
            /**
             * Has Phme
             */
            export type HasPhme = /* Has Phme */ boolean | null;
            export type Instrument = /* Instrument */ Components.Schemas.Instrument | null;
            /**
             * Instruments
             */
            export type Instruments = /* Instruments */ /* Instrument */ Components.Schemas.Instrument[] | null;
            /**
             * Intersects
             */
            export type Intersects = /* Intersects */ string | null;
            /**
             * Minpoints
             */
            export type Minpoints = number;
            /**
             * Plume Gas
             */
            export type PlumeGas = /* Plume Gas */ ("CO2" | "CH4") | null;
            /**
             * Plume Id
             */
            export type PlumeId = string;
            /**
             * Plume Ids
             */
            export type PlumeIds = /* Plume Ids */ string[] | null;
            /**
             * Plume Names
             */
            export type PlumeNames = /* Plume Names */ string[] | null;
            /**
             * Published At Datetime
             */
            export type PublishedAtDatetime = /* Published At Datetime */ string | null;
            /**
             * Qualities
             */
            export type Qualities = /* Qualities */ /* Quality */ Components.Schemas.Quality[] | null;
            /**
             * Scene Id
             */
            export type SceneId = /* Scene Id */ string | null;
            /**
             * Scene Ids
             */
            export type SceneIds = /* Scene Ids */ string[] | null;
            /**
             * Scene Name
             */
            export type SceneName = /* Scene Name */ string | null;
            /**
             * Search
             */
            export type Search = /* Search */ string | null;
            /**
             * Sectors
             */
            export type Sectors = /* Sectors */ ("1B2" | "6A" | "6B" | "4B" | "1B1a" | "1A1" | "other" | "NULL" | "NA")[] | null;
            /**
             * Source Name
             */
            export type SourceName = /* Source Name */ string | null;
            /**
             * Status
             */
            export type Status = "not_deleted" | "published" | "publish_ready" | "valid" | "deleted" | "hidden";
        }
        export interface PathParameters {
            plume_id: /* Plume Id */ Parameters.PlumeId;
        }
        export interface QueryParameters {
            plume_ids?: /* Plume Ids */ Parameters.PlumeIds;
            plume_names?: /* Plume Names */ Parameters.PlumeNames;
            scene_name?: /* Scene Name */ Parameters.SceneName;
            scene_id?: /* Scene Id */ Parameters.SceneId;
            scene_ids?: /* Scene Ids */ Parameters.SceneIds;
            search?: /* Search */ Parameters.Search;
            emission_min?: /* Emission Min */ Parameters.EmissionMin;
            emission_max?: /* Emission Max */ Parameters.EmissionMax;
            sectors?: /* Sectors */ Parameters.Sectors;
            plume_gas?: /* Plume Gas */ Parameters.PlumeGas;
            instrument?: Parameters.Instrument;
            instruments?: /* Instruments */ Parameters.Instruments;
            qualities?: /* Qualities */ Parameters.Qualities;
            intersects?: /* Intersects */ Parameters.Intersects;
            has_phme?: /* Has Phme */ Parameters.HasPhme;
            published_at_datetime?: /* Published At Datetime */ Parameters.PublishedAtDatetime;
            datetime?: /* Datetime */ Parameters.Datetime;
            source_name?: /* Source Name */ Parameters.SourceName;
            status?: /* Status */ Parameters.Status;
            eps?: /* Eps */ Parameters.Eps;
            minpoints?: /* Minpoints */ Parameters.Minpoints;
        }
        namespace Responses {
            export type $200 = /* PlumeSource */ Components.Schemas.PlumeSource;
            /**
             * Response
             */
            export type $404 = any;
        }
    }
    namespace CatalogApiSourceSource {
        namespace Parameters {
            /**
             * Datetime
             */
            export type Datetime = /* Datetime */ string | null;
            /**
             * Emission Max
             */
            export type EmissionMax = /* Emission Max */ number | null;
            /**
             * Emission Min
             */
            export type EmissionMin = /* Emission Min */ number | null;
            /**
             * Eps
             */
            export type Eps = number;
            /**
             * Gas
             */
            export type Gas = "CH4" | "CO2";
            /**
             * Has Phme
             */
            export type HasPhme = /* Has Phme */ boolean | null;
            export type Instrument = /* Instrument */ Components.Schemas.Instrument | null;
            /**
             * Instruments
             */
            export type Instruments = /* Instruments */ /* Instrument */ Components.Schemas.Instrument[] | null;
            /**
             * Intersects
             */
            export type Intersects = /* Intersects */ string | null;
            /**
             * Lat
             */
            export type Lat = number;
            /**
             * Lon
             */
            export type Lon = number;
            /**
             * Minpoints
             */
            export type Minpoints = number;
            /**
             * Plume Gas
             */
            export type PlumeGas = /* Plume Gas */ ("CO2" | "CH4") | null;
            /**
             * Plume Ids
             */
            export type PlumeIds = /* Plume Ids */ string[] | null;
            /**
             * Plume Names
             */
            export type PlumeNames = /* Plume Names */ string[] | null;
            /**
             * Published At Datetime
             */
            export type PublishedAtDatetime = /* Published At Datetime */ string | null;
            /**
             * Qualities
             */
            export type Qualities = /* Qualities */ /* Quality */ Components.Schemas.Quality[] | null;
            /**
             * Scene Id
             */
            export type SceneId = /* Scene Id */ string | null;
            /**
             * Scene Ids
             */
            export type SceneIds = /* Scene Ids */ string[] | null;
            /**
             * Scene Name
             */
            export type SceneName = /* Scene Name */ string | null;
            /**
             * Search
             */
            export type Search = /* Search */ string | null;
            /**
             * Sector
             */
            export type Sector = string;
            /**
             * Sectors
             */
            export type Sectors = /* Sectors */ ("1B2" | "6A" | "6B" | "4B" | "1B1a" | "1A1" | "other" | "NULL" | "NA")[] | null;
            /**
             * Source Name
             */
            export type SourceName = /* Source Name */ string | null;
            /**
             * Status
             */
            export type Status = "not_deleted" | "published" | "publish_ready" | "valid" | "deleted" | "hidden";
        }
        export interface PathParameters {
            gas: /* Gas */ Parameters.Gas;
            sector: /* Sector */ Parameters.Sector;
            eps: /* Eps */ Parameters.Eps;
            lon: /* Lon */ Parameters.Lon;
            lat: /* Lat */ Parameters.Lat;
        }
        export interface QueryParameters {
            plume_ids?: /* Plume Ids */ Parameters.PlumeIds;
            plume_names?: /* Plume Names */ Parameters.PlumeNames;
            scene_name?: /* Scene Name */ Parameters.SceneName;
            scene_id?: /* Scene Id */ Parameters.SceneId;
            scene_ids?: /* Scene Ids */ Parameters.SceneIds;
            search?: /* Search */ Parameters.Search;
            emission_min?: /* Emission Min */ Parameters.EmissionMin;
            emission_max?: /* Emission Max */ Parameters.EmissionMax;
            sectors?: /* Sectors */ Parameters.Sectors;
            plume_gas?: /* Plume Gas */ Parameters.PlumeGas;
            instrument?: Parameters.Instrument;
            instruments?: /* Instruments */ Parameters.Instruments;
            qualities?: /* Qualities */ Parameters.Qualities;
            intersects?: /* Intersects */ Parameters.Intersects;
            has_phme?: /* Has Phme */ Parameters.HasPhme;
            published_at_datetime?: /* Published At Datetime */ Parameters.PublishedAtDatetime;
            datetime?: /* Datetime */ Parameters.Datetime;
            source_name?: /* Source Name */ Parameters.SourceName;
            status?: /* Status */ Parameters.Status;
            minpoints?: /* Minpoints */ Parameters.Minpoints;
        }
        namespace Responses {
            export type $200 = /* PlumeSource */ Components.Schemas.PlumeSource;
        }
    }
    namespace CatalogApiSourceSourcePlumesCsv {
        namespace Parameters {
            /**
             * Datetime
             */
            export type Datetime = /* Datetime */ string | null;
            /**
             * Emission Max
             */
            export type EmissionMax = /* Emission Max */ number | null;
            /**
             * Emission Min
             */
            export type EmissionMin = /* Emission Min */ number | null;
            /**
             * Eps
             */
            export type Eps = number;
            /**
             * Gas
             */
            export type Gas = "CH4" | "CO2";
            /**
             * Has Phme
             */
            export type HasPhme = /* Has Phme */ boolean | null;
            export type Instrument = /* Instrument */ Components.Schemas.Instrument | null;
            /**
             * Instruments
             */
            export type Instruments = /* Instruments */ /* Instrument */ Components.Schemas.Instrument[] | null;
            /**
             * Intersects
             */
            export type Intersects = /* Intersects */ string | null;
            /**
             * Lat
             */
            export type Lat = number;
            /**
             * Lon
             */
            export type Lon = number;
            /**
             * Minpoints
             */
            export type Minpoints = number;
            /**
             * Plume Gas
             */
            export type PlumeGas = /* Plume Gas */ ("CO2" | "CH4") | null;
            /**
             * Plume Ids
             */
            export type PlumeIds = /* Plume Ids */ string[] | null;
            /**
             * Plume Names
             */
            export type PlumeNames = /* Plume Names */ string[] | null;
            /**
             * Published At Datetime
             */
            export type PublishedAtDatetime = /* Published At Datetime */ string | null;
            /**
             * Qualities
             */
            export type Qualities = /* Qualities */ /* Quality */ Components.Schemas.Quality[] | null;
            /**
             * Scene Id
             */
            export type SceneId = /* Scene Id */ string | null;
            /**
             * Scene Ids
             */
            export type SceneIds = /* Scene Ids */ string[] | null;
            /**
             * Scene Name
             */
            export type SceneName = /* Scene Name */ string | null;
            /**
             * Search
             */
            export type Search = /* Search */ string | null;
            /**
             * Sector
             */
            export type Sector = string;
            /**
             * Sectors
             */
            export type Sectors = /* Sectors */ ("1B2" | "6A" | "6B" | "4B" | "1B1a" | "1A1" | "other" | "NULL" | "NA")[] | null;
            /**
             * Sort
             */
            export type Sort = "asc" | "desc" | "emissions_desc" | "emissions_asc";
            /**
             * Source Name
             */
            export type SourceName = /* Source Name */ string | null;
            /**
             * Status
             */
            export type Status = "not_deleted" | "published" | "publish_ready" | "valid" | "deleted" | "hidden";
        }
        export interface PathParameters {
            gas: /* Gas */ Parameters.Gas;
            sector: /* Sector */ Parameters.Sector;
            eps: /* Eps */ Parameters.Eps;
            lon: /* Lon */ Parameters.Lon;
            lat: /* Lat */ Parameters.Lat;
        }
        export interface QueryParameters {
            plume_ids?: /* Plume Ids */ Parameters.PlumeIds;
            plume_names?: /* Plume Names */ Parameters.PlumeNames;
            scene_name?: /* Scene Name */ Parameters.SceneName;
            scene_id?: /* Scene Id */ Parameters.SceneId;
            scene_ids?: /* Scene Ids */ Parameters.SceneIds;
            search?: /* Search */ Parameters.Search;
            emission_min?: /* Emission Min */ Parameters.EmissionMin;
            emission_max?: /* Emission Max */ Parameters.EmissionMax;
            sectors?: /* Sectors */ Parameters.Sectors;
            plume_gas?: /* Plume Gas */ Parameters.PlumeGas;
            instrument?: Parameters.Instrument;
            instruments?: /* Instruments */ Parameters.Instruments;
            qualities?: /* Qualities */ Parameters.Qualities;
            intersects?: /* Intersects */ Parameters.Intersects;
            has_phme?: /* Has Phme */ Parameters.HasPhme;
            published_at_datetime?: /* Published At Datetime */ Parameters.PublishedAtDatetime;
            datetime?: /* Datetime */ Parameters.Datetime;
            source_name?: /* Source Name */ Parameters.SourceName;
            status?: /* Status */ Parameters.Status;
            minpoints?: /* Minpoints */ Parameters.Minpoints;
            sort?: /* Sort */ Parameters.Sort;
        }
        namespace Responses {
            export type $200 = /* PlumeSource */ Components.Schemas.PlumeSource;
        }
    }
    namespace CatalogApiSourceSourcesAggregate {
        namespace Parameters {
            /**
             * Bbox
             */
            export type Bbox = /* Bbox */ any[] | null;
            /**
             * Datetime
             */
            export type Datetime = /* Datetime */ string | null;
            /**
             * Emission Max
             */
            export type EmissionMax = /* Emission Max */ number | null;
            /**
             * Emission Min
             */
            export type EmissionMin = /* Emission Min */ number | null;
            /**
             * Eps
             */
            export type Eps = number;
            /**
             * Has Phme
             */
            export type HasPhme = /* Has Phme */ boolean | null;
            export type Instrument = /* Instrument */ Components.Schemas.Instrument | null;
            /**
             * Instruments
             */
            export type Instruments = /* Instruments */ /* Instrument */ Components.Schemas.Instrument[] | null;
            /**
             * Intersects
             */
            export type Intersects = /* Intersects */ string | null;
            /**
             * Minpoints
             */
            export type Minpoints = number;
            /**
             * Plume Gas
             */
            export type PlumeGas = /* Plume Gas */ ("CO2" | "CH4") | null;
            /**
             * Plume Ids
             */
            export type PlumeIds = /* Plume Ids */ string[] | null;
            /**
             * Plume Names
             */
            export type PlumeNames = /* Plume Names */ string[] | null;
            /**
             * Published At Datetime
             */
            export type PublishedAtDatetime = /* Published At Datetime */ string | null;
            /**
             * Qualities
             */
            export type Qualities = /* Qualities */ /* Quality */ Components.Schemas.Quality[] | null;
            /**
             * Scene Id
             */
            export type SceneId = /* Scene Id */ string | null;
            /**
             * Scene Ids
             */
            export type SceneIds = /* Scene Ids */ string[] | null;
            /**
             * Scene Name
             */
            export type SceneName = /* Scene Name */ string | null;
            /**
             * Search
             */
            export type Search = /* Search */ string | null;
            /**
             * Sectors
             */
            export type Sectors = /* Sectors */ ("1B2" | "6A" | "6B" | "4B" | "1B1a" | "1A1" | "other" | "NULL" | "NA")[] | null;
            /**
             * Source Name
             */
            export type SourceName = /* Source Name */ string | null;
            /**
             * Status
             */
            export type Status = "not_deleted" | "published" | "publish_ready" | "valid" | "deleted" | "hidden";
        }
        export interface QueryParameters {
            bbox?: /* Bbox */ Parameters.Bbox;
            plume_ids?: /* Plume Ids */ Parameters.PlumeIds;
            plume_names?: /* Plume Names */ Parameters.PlumeNames;
            scene_name?: /* Scene Name */ Parameters.SceneName;
            scene_id?: /* Scene Id */ Parameters.SceneId;
            scene_ids?: /* Scene Ids */ Parameters.SceneIds;
            search?: /* Search */ Parameters.Search;
            emission_min?: /* Emission Min */ Parameters.EmissionMin;
            emission_max?: /* Emission Max */ Parameters.EmissionMax;
            sectors?: /* Sectors */ Parameters.Sectors;
            plume_gas?: /* Plume Gas */ Parameters.PlumeGas;
            instrument?: Parameters.Instrument;
            instruments?: /* Instruments */ Parameters.Instruments;
            qualities?: /* Qualities */ Parameters.Qualities;
            intersects?: /* Intersects */ Parameters.Intersects;
            has_phme?: /* Has Phme */ Parameters.HasPhme;
            published_at_datetime?: /* Published At Datetime */ Parameters.PublishedAtDatetime;
            datetime?: /* Datetime */ Parameters.Datetime;
            source_name?: /* Source Name */ Parameters.SourceName;
            status?: /* Status */ Parameters.Status;
            eps?: /* Eps */ Parameters.Eps;
            minpoints?: /* Minpoints */ Parameters.Minpoints;
        }
        namespace Responses {
            /**
             * Response
             */
            export type $200 = /* SourceAggregation */ Components.Schemas.SourceAggregation[];
        }
    }
    namespace CatalogApiSourceSourcesCsv {
        namespace Parameters {
            /**
             * Bbox
             */
            export type Bbox = /* Bbox */ any[] | null;
            /**
             * Datetime
             */
            export type Datetime = /* Datetime */ string | null;
            /**
             * Emission Max
             */
            export type EmissionMax = /* Emission Max */ number | null;
            /**
             * Emission Min
             */
            export type EmissionMin = /* Emission Min */ number | null;
            /**
             * Eps
             */
            export type Eps = number;
            /**
             * Has Phme
             */
            export type HasPhme = /* Has Phme */ boolean | null;
            export type Instrument = /* Instrument */ Components.Schemas.Instrument | null;
            /**
             * Instruments
             */
            export type Instruments = /* Instruments */ /* Instrument */ Components.Schemas.Instrument[] | null;
            /**
             * Intersects
             */
            export type Intersects = /* Intersects */ string | null;
            /**
             * Minpoints
             */
            export type Minpoints = number;
            /**
             * Plume Gas
             */
            export type PlumeGas = /* Plume Gas */ ("CO2" | "CH4") | null;
            /**
             * Plume Ids
             */
            export type PlumeIds = /* Plume Ids */ string[] | null;
            /**
             * Plume Names
             */
            export type PlumeNames = /* Plume Names */ string[] | null;
            /**
             * Published At Datetime
             */
            export type PublishedAtDatetime = /* Published At Datetime */ string | null;
            /**
             * Qualities
             */
            export type Qualities = /* Qualities */ /* Quality */ Components.Schemas.Quality[] | null;
            /**
             * Scene Id
             */
            export type SceneId = /* Scene Id */ string | null;
            /**
             * Scene Ids
             */
            export type SceneIds = /* Scene Ids */ string[] | null;
            /**
             * Scene Name
             */
            export type SceneName = /* Scene Name */ string | null;
            /**
             * Search
             */
            export type Search = /* Search */ string | null;
            /**
             * Sectors
             */
            export type Sectors = /* Sectors */ ("1B2" | "6A" | "6B" | "4B" | "1B1a" | "1A1" | "other" | "NULL" | "NA")[] | null;
            /**
             * Source Name
             */
            export type SourceName = /* Source Name */ string | null;
            /**
             * Status
             */
            export type Status = "not_deleted" | "published" | "publish_ready" | "valid" | "deleted" | "hidden";
        }
        export interface QueryParameters {
            bbox?: /* Bbox */ Parameters.Bbox;
            plume_ids?: /* Plume Ids */ Parameters.PlumeIds;
            plume_names?: /* Plume Names */ Parameters.PlumeNames;
            scene_name?: /* Scene Name */ Parameters.SceneName;
            scene_id?: /* Scene Id */ Parameters.SceneId;
            scene_ids?: /* Scene Ids */ Parameters.SceneIds;
            search?: /* Search */ Parameters.Search;
            emission_min?: /* Emission Min */ Parameters.EmissionMin;
            emission_max?: /* Emission Max */ Parameters.EmissionMax;
            sectors?: /* Sectors */ Parameters.Sectors;
            plume_gas?: /* Plume Gas */ Parameters.PlumeGas;
            instrument?: Parameters.Instrument;
            instruments?: /* Instruments */ Parameters.Instruments;
            qualities?: /* Qualities */ Parameters.Qualities;
            intersects?: /* Intersects */ Parameters.Intersects;
            has_phme?: /* Has Phme */ Parameters.HasPhme;
            published_at_datetime?: /* Published At Datetime */ Parameters.PublishedAtDatetime;
            datetime?: /* Datetime */ Parameters.Datetime;
            source_name?: /* Source Name */ Parameters.SourceName;
            status?: /* Status */ Parameters.Status;
            eps?: /* Eps */ Parameters.Eps;
            minpoints?: /* Minpoints */ Parameters.Minpoints;
        }
        namespace Responses {
            /**
             * Response
             */
            export type $200 = string;
        }
    }
    namespace CatalogApiSourceSourcesGeojson {
        namespace Parameters {
            /**
             * Bbox
             */
            export type Bbox = /* Bbox */ any[] | null;
            /**
             * Datetime
             */
            export type Datetime = /* Datetime */ string | null;
            /**
             * Emission Max
             */
            export type EmissionMax = /* Emission Max */ number | null;
            /**
             * Emission Min
             */
            export type EmissionMin = /* Emission Min */ number | null;
            /**
             * Eps
             */
            export type Eps = number;
            /**
             * Has Phme
             */
            export type HasPhme = /* Has Phme */ boolean | null;
            export type Instrument = /* Instrument */ Components.Schemas.Instrument | null;
            /**
             * Instruments
             */
            export type Instruments = /* Instruments */ /* Instrument */ Components.Schemas.Instrument[] | null;
            /**
             * Intersects
             */
            export type Intersects = /* Intersects */ string | null;
            /**
             * Minpoints
             */
            export type Minpoints = number;
            /**
             * Plume Gas
             */
            export type PlumeGas = /* Plume Gas */ ("CO2" | "CH4") | null;
            /**
             * Plume Ids
             */
            export type PlumeIds = /* Plume Ids */ string[] | null;
            /**
             * Plume Names
             */
            export type PlumeNames = /* Plume Names */ string[] | null;
            /**
             * Published At Datetime
             */
            export type PublishedAtDatetime = /* Published At Datetime */ string | null;
            /**
             * Qualities
             */
            export type Qualities = /* Qualities */ /* Quality */ Components.Schemas.Quality[] | null;
            /**
             * Scene Id
             */
            export type SceneId = /* Scene Id */ string | null;
            /**
             * Scene Ids
             */
            export type SceneIds = /* Scene Ids */ string[] | null;
            /**
             * Scene Name
             */
            export type SceneName = /* Scene Name */ string | null;
            /**
             * Search
             */
            export type Search = /* Search */ string | null;
            /**
             * Sectors
             */
            export type Sectors = /* Sectors */ ("1B2" | "6A" | "6B" | "4B" | "1B1a" | "1A1" | "other" | "NULL" | "NA")[] | null;
            /**
             * Source Name
             */
            export type SourceName = /* Source Name */ string | null;
            /**
             * Status
             */
            export type Status = "not_deleted" | "published" | "publish_ready" | "valid" | "deleted" | "hidden";
        }
        export interface QueryParameters {
            bbox?: /* Bbox */ Parameters.Bbox;
            plume_ids?: /* Plume Ids */ Parameters.PlumeIds;
            plume_names?: /* Plume Names */ Parameters.PlumeNames;
            scene_name?: /* Scene Name */ Parameters.SceneName;
            scene_id?: /* Scene Id */ Parameters.SceneId;
            scene_ids?: /* Scene Ids */ Parameters.SceneIds;
            search?: /* Search */ Parameters.Search;
            emission_min?: /* Emission Min */ Parameters.EmissionMin;
            emission_max?: /* Emission Max */ Parameters.EmissionMax;
            sectors?: /* Sectors */ Parameters.Sectors;
            plume_gas?: /* Plume Gas */ Parameters.PlumeGas;
            instrument?: Parameters.Instrument;
            instruments?: /* Instruments */ Parameters.Instruments;
            qualities?: /* Qualities */ Parameters.Qualities;
            intersects?: /* Intersects */ Parameters.Intersects;
            has_phme?: /* Has Phme */ Parameters.HasPhme;
            published_at_datetime?: /* Published At Datetime */ Parameters.PublishedAtDatetime;
            datetime?: /* Datetime */ Parameters.Datetime;
            source_name?: /* Source Name */ Parameters.SourceName;
            status?: /* Status */ Parameters.Status;
            eps?: /* Eps */ Parameters.Eps;
            minpoints?: /* Minpoints */ Parameters.Minpoints;
        }
        namespace Responses {
            export type $200 = /**
             * FeatureCollection
             * FeatureCollection Model
             */
            Components.Schemas.FeatureCollection;
        }
    }
    namespace Cc7ea866ControllerObtainToken {
        export type RequestBody = /* CustomTokenObtainPairInputSchema */ Components.Schemas.CustomTokenObtainPairInputSchema;
        namespace Responses {
            export type $200 = /* CustomTokenObtainPairOutSchema */ Components.Schemas.CustomTokenObtainPairOutSchema;
        }
    }
    namespace LayersApiAoiAoiCreate {
        export type RequestBody = /* AoiIn */ Components.Schemas.AoiIn;
        namespace Responses {
            export type $200 = /* AoiMutationOut */ Components.Schemas.AoiMutationOut;
        }
    }
    namespace LayersApiAoiAoiCreateForm {
        /**
         * MultiPartBodyParams
         */
        export interface RequestBody {
            /**
             * Name
             */
            name?: /* Name */ string | null;
            /**
             * Description
             */
            description?: /* Description */ string | null;
            /**
             * File
             */
            file: string; // binary
        }
        namespace Responses {
            export type $200 = /* AoiMutationOut */ Components.Schemas.AoiMutationOut;
        }
    }
    namespace LayersApiAoiAoiGet {
        namespace Parameters {
            /**
             * Aoi Id
             */
            export type AoiId = string;
        }
        export interface PathParameters {
            aoi_id: /* Aoi Id */ Parameters.AoiId;
        }
        namespace Responses {
            export type $200 = /* AoiOut */ Components.Schemas.AoiOut;
        }
    }
    namespace LayersApiAoiAoiList {
        namespace Parameters {
            /**
             * Limit
             */
            export type Limit = number;
            /**
             * Offset
             */
            export type Offset = number;
        }
        export interface QueryParameters {
            limit?: /* Limit */ Parameters.Limit;
            offset?: /* Offset */ Parameters.Offset;
        }
        namespace Responses {
            export type $200 = /* PagedAoiOut */ Components.Schemas.PagedAoiOut;
        }
    }
    namespace LayersApiRasterAssetPkTile {
        namespace Parameters {
            /**
             * Pk
             */
            export type Pk = string;
            /**
             * Scale
             */
            export type Scale = number;
            /**
             * X
             */
            export type X = number;
            /**
             * Y
             */
            export type Y = number;
            /**
             * Z
             */
            export type Z = number;
        }
        export interface PathParameters {
            pk: /* Pk */ Parameters.Pk;
            z: /* Z */ Parameters.Z;
            x: /* X */ Parameters.X;
            y: /* Y */ Parameters.Y;
        }
        export interface QueryParameters {
            scale?: /* Scale */ Parameters.Scale;
        }
        namespace Responses {
            export interface $200 {
            }
        }
    }
    namespace LayersApiRasterAssetTileScale {
        namespace Parameters {
            /**
             * Pk
             */
            export type Pk = string;
            /**
             * Scale
             */
            export type Scale = number;
            /**
             * X
             */
            export type X = number;
            /**
             * Y
             */
            export type Y = number;
            /**
             * Z
             */
            export type Z = number;
        }
        export interface PathParameters {
            pk: /* Pk */ Parameters.Pk;
            z: /* Z */ Parameters.Z;
            x: /* X */ Parameters.X;
            y: /* Y */ Parameters.Y;
            scale: /* Scale */ Parameters.Scale;
        }
        namespace Responses {
            export interface $200 {
            }
        }
    }
    namespace LayersApiRasterSceneTile {
        namespace Parameters {
            /**
             * Product
             */
            export type Product = "co2" | "ch4" | "rgb";
            /**
             * Scene Id
             */
            export type SceneId = string;
            /**
             * X
             */
            export type X = number;
            /**
             * Y
             */
            export type Y = number;
            /**
             * Z
             */
            export type Z = number;
        }
        export interface PathParameters {
            scene_id: /* Scene Id */ Parameters.SceneId;
            product: /* Product */ Parameters.Product;
            z: /* Z */ Parameters.Z;
            x: /* X */ Parameters.X;
            y: /* Y */ Parameters.Y;
        }
        namespace Responses {
            /**
             * Response
             */
            export type $200 = string; // binary
        }
    }
    namespace LayersApiRasterSceneTileScale {
        namespace Parameters {
            /**
             * Product
             */
            export type Product = "co2" | "ch4" | "rgb";
            /**
             * Scale
             */
            export type Scale = number;
            /**
             * Scene Id
             */
            export type SceneId = string;
            /**
             * X
             */
            export type X = number;
            /**
             * Y
             */
            export type Y = number;
            /**
             * Z
             */
            export type Z = number;
        }
        export interface PathParameters {
            scene_id: /* Scene Id */ Parameters.SceneId;
            product: /* Product */ Parameters.Product;
            z: /* Z */ Parameters.Z;
            x: /* X */ Parameters.X;
            y: /* Y */ Parameters.Y;
            scale: /* Scale */ Parameters.Scale;
        }
        namespace Responses {
            /**
             * Response
             */
            export type $200 = string; // binary
        }
    }
    namespace LayersApiVectorPlumesTile {
        namespace Parameters {
            /**
             * X
             */
            export type X = number;
            /**
             * Y
             */
            export type Y = number;
            /**
             * Z
             */
            export type Z = number;
        }
        export interface PathParameters {
            z: /* Z */ Parameters.Z;
            x: /* X */ Parameters.X;
            y: /* Y */ Parameters.Y;
        }
        namespace Responses {
            /**
             * Response
             */
            export type $200 = string; // binary
        }
    }
    namespace LayersApiVectorPlumesTileUncached {
        namespace Parameters {
            /**
             * X
             */
            export type X = number;
            /**
             * Y
             */
            export type Y = number;
            /**
             * Z
             */
            export type Z = number;
        }
        export interface PathParameters {
            z: /* Z */ Parameters.Z;
            x: /* X */ Parameters.X;
            y: /* Y */ Parameters.Y;
        }
        namespace Responses {
            /**
             * Response
             */
            export type $200 = string; // binary
        }
    }
    namespace LayersApiVectorScenesTile {
        namespace Parameters {
            /**
             * X
             */
            export type X = number;
            /**
             * Y
             */
            export type Y = number;
            /**
             * Z
             */
            export type Z = number;
        }
        export interface PathParameters {
            z: /* Z */ Parameters.Z;
            x: /* X */ Parameters.X;
            y: /* Y */ Parameters.Y;
        }
        namespace Responses {
            /**
             * Response
             */
            export type $200 = string; // binary
        }
    }
    namespace LayersApiVectorScenesTileScaleUncached {
        namespace Parameters {
            /**
             * X
             */
            export type X = number;
            /**
             * Y
             */
            export type Y = number;
            /**
             * Z
             */
            export type Z = number;
        }
        export interface PathParameters {
            z: /* Z */ Parameters.Z;
            x: /* X */ Parameters.X;
            y: /* Y */ Parameters.Y;
        }
        namespace Responses {
            /**
             * Response
             */
            export type $200 = string; // binary
        }
    }
    namespace PickerApiAssignment {
        namespace Parameters {
            /**
             * Pk
             */
            export type Pk = string;
        }
        export interface PathParameters {
            pk: /* Pk */ Parameters.Pk;
        }
        namespace Responses {
            export type $200 = /* AssignmentOut */ Components.Schemas.AssignmentOut;
        }
    }
    namespace PickerApiAssignmentCreate {
        export type RequestBody = /* AssignmentIn */ Components.Schemas.AssignmentIn;
        namespace Responses {
            export type $200 = /* AssignmentOut */ Components.Schemas.AssignmentOut;
        }
    }
    namespace PickerApiAssignments {
        namespace Parameters {
            /**
             * Assignee Id
             */
            export type AssigneeId = string;
            /**
             * Assigner Id
             */
            export type AssignerId = string;
            /**
             * Assignment Status
             */
            export type AssignmentStatus = string;
            /**
             * Limit
             */
            export type Limit = number;
            /**
             * Offset
             */
            export type Offset = number;
            /**
             * Scene Search
             */
            export type SceneSearch = string;
        }
        export interface QueryParameters {
            assigner_id?: /* Assigner Id */ Parameters.AssignerId;
            assignee_id?: /* Assignee Id */ Parameters.AssigneeId;
            assignment_status?: /* Assignment Status */ Parameters.AssignmentStatus;
            scene_search?: /* Scene Search */ Parameters.SceneSearch;
            limit?: /* Limit */ Parameters.Limit;
            offset?: /* Offset */ Parameters.Offset;
        }
        namespace Responses {
            export type $200 = /* PagedAssignmentOut */ Components.Schemas.PagedAssignmentOut;
        }
    }
    namespace PickerApiDeleteAssignment {
        namespace Parameters {
            /**
             * Pk
             */
            export type Pk = number;
        }
        export interface PathParameters {
            pk: /* Pk */ Parameters.Pk;
        }
        namespace Responses {
            /**
             * Response
             */
            export type $200 = boolean;
        }
    }
    namespace PickerApiModifyAssignment {
        namespace Parameters {
            /**
             * Pk
             */
            export type Pk = number;
        }
        export interface PathParameters {
            pk: /* Pk */ Parameters.Pk;
        }
        export type RequestBody = /* AssignmentIn */ Components.Schemas.AssignmentIn;
        namespace Responses {
            export type $200 = /* AssignmentOut */ Components.Schemas.AssignmentOut;
        }
    }
    namespace PickerApiSceneAssessment {
        namespace Parameters {
            /**
             * Scene Id
             */
            export type SceneId = string;
        }
        export interface PathParameters {
            scene_id: /* Scene Id */ Parameters.SceneId;
        }
        namespace Responses {
            export type $200 = /* SceneAssessmentOut */ Components.Schemas.SceneAssessmentOut;
        }
    }
    namespace PickerApiSceneAssessmentCreate {
        export type RequestBody = /* SceneAssessmentIn */ Components.Schemas.SceneAssessmentIn;
        namespace Responses {
            export type $200 = /* SceneAssessmentOut */ Components.Schemas.SceneAssessmentOut;
        }
    }
    namespace PickerApiSceneAssessmentStatusUpdate {
        namespace Parameters {
            /**
             * Pk
             */
            export type Pk = string;
        }
        export interface PathParameters {
            pk: /* Pk */ Parameters.Pk;
        }
        export type RequestBody = /* UpdateUserSceneAssignmentStatusIn */ Components.Schemas.UpdateUserSceneAssignmentStatusIn;
        namespace Responses {
            export type $200 = /* UserSceneAssignmentStatusOut */ Components.Schemas.UserSceneAssignmentStatusOut;
        }
    }
    namespace StacApiGetCatalog {
        namespace Responses {
            /**
             * Response
             */
            export interface $200 {
            }
        }
    }
    namespace StacApiGetCollection {
        namespace Parameters {
            /**
             * Collection Id
             */
            export type CollectionId = string;
        }
        export interface PathParameters {
            collection_id: /* Collection Id */ Parameters.CollectionId;
        }
        namespace Responses {
            /**
             * Response
             */
            export interface $200 {
            }
        }
    }
    namespace StacApiGetCollections {
        namespace Responses {
            /**
             * Response
             */
            export interface $200 {
            }
        }
    }
    namespace StacApiGetConformance {
        namespace Responses {
            /**
             * Response
             */
            export interface $200 {
            }
        }
    }
    namespace StacApiGetFeature {
        namespace Parameters {
            /**
             * Collection Id
             */
            export type CollectionId = string;
            /**
             * Feature Id
             */
            export type FeatureId = string;
        }
        export interface PathParameters {
            collection_id: /* Collection Id */ Parameters.CollectionId;
            feature_id: /* Feature Id */ Parameters.FeatureId;
        }
        namespace Responses {
            /**
             * Response
             */
            export interface $200 {
            }
        }
    }
    namespace StacApiGetItems {
        namespace Parameters {
            /**
             * Bbox
             */
            export type Bbox = /* Bbox */ string | null;
            /**
             * Collection Id
             */
            export type CollectionId = string;
            /**
             * Collections
             */
            export type Collections = /* Collections */ string[] | null;
            /**
             * Datetime
             */
            export type Datetime = /* Datetime */ string | null;
            /**
             * Ids
             */
            export type Ids = /* Ids */ string[] | null;
            /**
             * Intersects
             */
            export type Intersects = /* Intersects */ string | null;
            /**
             * Limit
             */
            export type Limit = number;
            /**
             * Offset
             */
            export type Offset = number;
        }
        export interface PathParameters {
            collection_id: /* Collection Id */ Parameters.CollectionId;
        }
        export interface QueryParameters {
            offset?: /* Offset */ Parameters.Offset;
            limit?: /* Limit */ Parameters.Limit;
            bbox?: /* Bbox */ Parameters.Bbox;
            datetime?: /* Datetime */ Parameters.Datetime;
            intersects?: /* Intersects */ Parameters.Intersects;
            ids?: /* Ids */ Parameters.Ids;
            collections?: /* Collections */ Parameters.Collections;
        }
        namespace Responses {
            /**
             * Response
             */
            export interface $200 {
            }
        }
    }
    namespace StacApiGetSearch {
        namespace Parameters {
            /**
             * Bbox
             */
            export type Bbox = /* Bbox */ string | null;
            /**
             * Collections
             */
            export type Collections = /* Collections */ string[] | null;
            /**
             * Datetime
             */
            export type Datetime = /* Datetime */ string | null;
            /**
             * Ids
             */
            export type Ids = /* Ids */ string[] | null;
            /**
             * Intersects
             */
            export type Intersects = /* Intersects */ string | null;
            /**
             * Limit
             */
            export type Limit = number;
            /**
             * Offset
             */
            export type Offset = number;
        }
        export interface QueryParameters {
            offset?: /* Offset */ Parameters.Offset;
            limit?: /* Limit */ Parameters.Limit;
            bbox?: /* Bbox */ Parameters.Bbox;
            datetime?: /* Datetime */ Parameters.Datetime;
            intersects?: /* Intersects */ Parameters.Intersects;
            ids?: /* Ids */ Parameters.Ids;
            collections?: /* Collections */ Parameters.Collections;
        }
        namespace Responses {
            /**
             * Response
             */
            export interface $200 {
            }
        }
    }
}
