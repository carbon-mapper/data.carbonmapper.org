// Conflicting name, should change
interface Statistics {
    totalObservations: number;
    totalPlumes: number;
    totalNullDetects: number;
    totalQuantifiedPlumes: number;
    airborneCount: number;
    satelliteCount: number;
    numObservedDays: number | undefined;
    numDetectedDays: number | undefined;
}

export const getDataTables = ({
    totalObservations,
    totalPlumes,
    totalNullDetects,
    airborneCount,
    satelliteCount,
    numDetectedDays,
    numObservedDays
}: Statistics) => {
    const firstSection = {
        title: 'Observation Statistics General',
        data: [
            {
                title: 'Number of Observations',
                value: totalObservations
            },
            {
                title: 'Observations: Airborne',
                value: airborneCount
            },
            {
                title: 'Observations: Satellite',
                value: satelliteCount
            }
        ]
    };

    if (numDetectedDays !== undefined) firstSection.data.push({ title: 'Detection Days', value: numDetectedDays });
    if (numObservedDays !== undefined) firstSection.data.push({ title: 'Observed Days', value: numObservedDays });

    const secondSection = {
        title: 'Observation Statistics Details',
        data: [
            {
                title: 'Number of Plumes',
                value: totalPlumes
            },
            {
                title: 'Number of Null Detects',
                value: totalNullDetects
            }
        ]
    };

    return [firstSection, secondSection];
};
