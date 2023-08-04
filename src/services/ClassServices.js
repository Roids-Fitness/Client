import axios from 'axios';

// Fetching class data from the api
export const fetchClasses = async (apiURL) => {
  try {
    const response = await axios.get(`${apiURL}/class`);
    const data = response.data;
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error fetching classes:', error);
  }
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
