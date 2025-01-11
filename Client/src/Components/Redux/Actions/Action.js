export const SUCCESS_PRODUCT_FETCHED = "SUCCESS_PRODUCT_FETCHED";
export const FAILED_PRODUCT_FETCHED = "FAILED_PRODUCT_FETCHED";



export const getProducts = () => async (dispatch) => {
  try {
    // Make the API call using fetch
    const response = await fetch("/getProducts");

    // Check if the response is ok (status in the range 200-299)
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    // Parse the JSON data
    const data = await response.json();

    // Dispatch a success action with the data
    dispatch({
      type: SUCCESS_PRODUCT_FETCHED,
      payload: data,
    });
  } catch (error) {
    // Dispatch a failure action with the error message
    dispatch({
      type: FAILED_PRODUCT_FETCHED,
      payload: error.message, // fetch doesn't have error.response like axios
    });
  }
};

