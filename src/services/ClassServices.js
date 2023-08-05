/**
 * Function to convert the class data to the calendar data usable for DayPilot
 * @param {*} data 
 * @returns convertedData
 */
export const convertClassData = (data) => {
    const convertedData = data.map((item) => {
        const { _id, title, description, startTime, endTime, trainer, participantList } = item;
        return {
        id: _id,
        text: title,
        description,
        start: startTime,
        end: endTime,
        trainer,
        backColor: '#E8EAED',
        participantList
        };
    });
    return convertedData;
};
