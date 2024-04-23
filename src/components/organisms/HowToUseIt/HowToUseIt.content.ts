import type { PageContent } from './HowToUseIt.types';

const ASSET_LOCATION = 'https://s3.us-west-1.amazonaws.com/msf.data/how_to_use_it';

export const content: PageContent[] = [
    {
        title: 'Overview',
        content: {
            type: 'text',
            text: [
                'Carbon Mapper is a non-profit organization building a global monitoring system for methane and carbon dioxide emissions. The system uses a combination of satellites and aircraft to provide daily to weekly observations of emissions from point sources, such as oil and gas facilities, landfills, and agricultural operations. The data collected by Carbon Mapper is made freely available to the public, and can be used to help governments, businesses, and other organizations reduce their emissions and mitigate climate change.',
                "To help users understand and mitigate emissions, Carbon Mapper has developed a data portal that focuses on human-generated high emission point sources. The portal provides information on methane and carbon dioxide plume locations, imagery, emission rates, and uncertainties from individual facilities around the world. This information is gathered from NASA's next generation Airborne Visible/Infrared Imaging Spectrometer (AVIRIS-NG), ASU's Global Airborne Observatory (GAO), NASA's Earth Surface Mineral Dust Source Investigation (EMIT), and soon, Planet's Tanager constellation.",
                'The plume concentration maps shown here are currently available at spatial resolutions ranging from 3 to 8 meters for airborne (depending on aircraft altitude) or 30 to 60 meters for satellite, allowing for precise attribution to individual emission sources.',
                'The data shown here was collected from airborne campaigns starting in 2016 and satellite campaigns starting in 2023. Coverage exists throughout the world and is on track to grow exponentially with the launch of additional satellites.',
                'If you have specific questions regarding the data portal, please see our FAQs.'
            ]
        }
    },
    {
        title: 'Step 1: Using Search',
        content: {
            type: 'slider',
            slides: [
                {
                    video: `${ASSET_LOCATION}/01-01.mp4`,
                    text: [
                        'To navigate the map interface, begin by searching by location, latitude/longtude coordinate, or a plume ID, if known.'
                    ]
                },
                {
                    video: `${ASSET_LOCATION}/01-02.mp4`,
                    text: [
                        'Advanced search filters are available to allow for search by date, sector, gas, emission rate, number of plumes, and persistence, which is the frequency of plume presence in new images over a source.'
                    ]
                }
            ]
        }
    },
    {
        title: 'Step 2: Navigating Sources',
        content: {
            type: 'slider',
            slides: [
                {
                    image: `${ASSET_LOCATION}/02-01.jpg`,
                    text: [
                        "Use the map's zoom function or zoom by trackpad to drill down into groups of sources or clusters in order to find a specific source. Sources are approximate ground-based locations of methane or carbon dioxide emitting infrastructure."
                    ]
                },
                {
                    video: `${ASSET_LOCATION}/02-02.mp4`,
                    text: [
                        "The Sources panel button at the top right area of the map will display a list of sources based upon the map's current view. Clicking on a source from this list or from the map will display that source's details."
                    ]
                },
                {
                    image: `${ASSET_LOCATION}/02-03.jpg`,
                    text: ['Use the Layers panel to view the map in cartographic detail or satellite detail.']
                },
                {
                    video: `${ASSET_LOCATION}/02-04.mp4`,
                    text: [
                        'Click on the Summary Statistics button at the bottom right of the map to view a summary of the sources within the current view, including an aggregated emission rate broken down by sector, the number of plumes, and the number of persistent sources. Hover over each sector to view the aggregated emission rate specific to that sector.'
                    ]
                },
                {
                    image: `${ASSET_LOCATION}/02-05.jpg`,
                    text: [
                        "The Accessibility feature at the bottom right of the map will adjust the map's color for optimal color contrast."
                    ]
                }
            ]
        }
    },
    {
        title: 'Step 3: Viewing Source Details',
        content: {
            type: 'slider',
            slides: [
                {
                    video: `${ASSET_LOCATION}/03-01.mp4`,
                    text: [
                        'Click on a source marker on the map or a source within the Sources panel to view the source details panel. Listed here is a list of plume(s) associated with a source, time-series chart of emission rates, and summary statistics as applicable. Click on a plume from the list to display its plume image on the map along with more details.'
                    ]
                },
                {
                    video: `${ASSET_LOCATION}/03-02.mp4`,
                    text: ['The Supporting Details tab displays additional metadata relevant to the source.']
                },
                {
                    video: `${ASSET_LOCATION}/03-03.mp4`,
                    text: [
                        'Use the Sort by Date feature to change the order of plumes or observations listed by recency. Check the Include Null Detects checkbox to view observations where a plume was not detected.'
                    ]
                }
            ]
        }
    },
    {
        title: 'Step 4: Coming Soon',
        content: {
            type: 'slider',
            slides: [
                {
                    image: `${ASSET_LOCATION}/04-01.jpg`,
                    text: [
                        'In a future iteration, additional functionality will be added to allow for account registration and the ability to save searches, save observations as collections, create alerts, and search the map by drawing a polygon or by uploading a shape file.'
                    ]
                }
            ]
        }
    }
];
