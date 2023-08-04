// Fetching class data from the api
export const fetchClasses = async (apiURL) => {
  const response = await fetch(`${apiURL}/class`);
  const data = await response.json();
  console.log(data);
  return data;
};

// data conversion model for the class data for the calendar
export const convertClassData = (data) => {
    const convertedData = data.map((item) => {
        const { _id, title, description, startTime, endTime, trainer } = item;
        return {
        id: _id,
        text: title,
        description,
        start: startTime,
        end: endTime,
        trainer,
        };
    });
    return convertedData;
};
