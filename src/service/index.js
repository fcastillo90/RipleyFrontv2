import axios from "axios";

const randomFailure = async () => Math.floor(Math.random() * Math.floor(9))

const apiCall = (weatherQuery, handleOpen, handleSetWeather) =>  {
  let headers = { headers: { 'Content-Type': 'application/json' } };
  let body = weatherQuery
  handleOpen();
  randomFailure().then((response)=> {
    if(response){
      axios.post(
        "https://fcastillo90ripleybackv2.herokuapp.com/external-api",
        body,
        headers
      )
      .then((response) => {
        handleSetWeather({ status: true, event: weatherQuery, ...response.data });
      })
      .catch((error) => {
        handleSetWeather({ status: true, event: weatherQuery, error: true, data: {} });
      })
    } else {
      apiCall(weatherQuery, handleOpen, handleSetWeather);
    }
  });
};

export default apiCall;