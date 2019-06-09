import React, { useState } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import { withStyles } from '@material-ui/core/styles';
import Dialog from "@material-ui/core/Dialog";
import withMobileDialog from '@material-ui/core/withMobileDialog';
import DialogContentComponent from "./components/DialogContentComponent";
import apiCall from "./service";

const styles = theme => ({
  mapStyles: {
    width: '100%',
    height: '100%'
  },
}); 

function MapContainer({google, fullScreen, classes}) {
  const [open, setOpen] = useState(false);
  const [weather, setWeather] = useState({ status: false, error: false, data: {}, action: {} });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSetWeather = data => setWeather(data);
  const handleClearState = () => setWeather({ status: false, error: false, data: {}, action: {} });

  const handleClick = (mapProps, map, clickEvent) => {
    let weatherQuery = {
      lat:clickEvent.latLng.lat(true),
      lon:clickEvent.latLng.lng(true)
    }
    handleOpen();
    handleServiceCall(weatherQuery);
  };
  const handleServiceCall = (weatherQuery) => {
    handleClearState();
    return apiCall(weatherQuery, handleOpen, handleSetWeather);
  }
  return (
    <>
      <Map
        google={google}
        zoom={14}
        className={classes.mapStyles}
        onClick={handleClick}
      />
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        onExited={handleClearState}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContentComponent weatherResponseData={weather} retry={handleServiceCall} responsive={fullScreen} handleClose={handleClose} />
      </Dialog>
    </>
  );
}

export default withStyles(styles)(withMobileDialog()(GoogleApiWrapper({
  apiKey: 'AIzaSyD0gw3698rbpzxgU-okTh9OqmszNnWATDU'
})(MapContainer)));