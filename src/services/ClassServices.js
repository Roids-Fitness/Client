

// fetching class data from the api
export const fetchClasses = async () => { 
    const response = await fetch(`${API_URL}/class`);
    const data = await response.json();
    return data;
}