import React from "react";
import { withStyles } from '@material-ui/core/styles';
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import clearDay from "../images/clear-day.svg";
import clearNight from "../images/clear-night.svg";
import cloudy from "../images/cloudy.svg";
import partlyCloudyDay from "../images/partly-cloudy-day.svg";
import partlyCloudyNight from "../images/partly-cloudy-night.svg";
import rain from "../images/rain.svg";
import sleet from "../images/sleet.svg";
import snow from "../images/snow.svg";
import unknown from "../images/default.svg";
import withMobileDialog from '@material-ui/core/withMobileDialog';
import { Typography, Grid, CircularProgress, Fab, IconButton } from "@material-ui/core";
import moment from 'moment';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Refresh from '@material-ui/icons/Refresh';
import Close from '@material-ui/icons/Close';
moment.locale('es'); 
const styles = theme => ({
  iconImage: {
    width: 96,
    height: 96,
  },
  centerAlign: {
    textAlign: 'center',
  },
  rightAlign: {
    textAlign: 'right'
  },
  tableCell:{borderBottom: 0, color: '#555',},
  borderRight:{borderRight: '1px solid rgba(0,0,0,0.1)'}, 
  progress: {
    margin: theme.spacing(2),
  },
  greyLetter: {
    color: '#aaa',
  },
  Aligner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  closeIcon: {
    position: 'absolute',
    top: 0,
    right: 0,
  }
});
const weatherIcons = icon => {
  switch (icon) {
    case "clear-day":
      return clearDay;
    case "clear-night":
      return clearNight;
    case "rain":
      return rain;
    case "snow":
      return snow;
    case "sleet":
      return sleet;
    case "cloudy":
      return cloudy;
    case "partly-cloudy-day":
      return partlyCloudyDay;
    case "partly-cloudy-night":
      return partlyCloudyNight;
    default:
      return unknown;
  }
};
function DialogContentComponent({classes, weatherResponseData, retry, handleClose, responsive}) {
  let data = weatherResponseData.data;
  let status = weatherResponseData.status;
  let error = weatherResponseData.error;
  const handleRetry = () => {
    retry(data);
  }
  return (
    <>
      {status ?
        !error && data.code !== 400 ?
          <>
            <DialogTitle id="alert-dialog-title" disableTypography>
              <IconButton aria-label="Delete" onClick={handleClose} className={classes.closeIcon}>
                <Close fontSize="small" />
              </IconButton>
              <Grid 
                container
                direction="row"
                justify="space-between"
                alignItems="center"
              >
                <Grid item>
                  <Typography variant="h4">{data.timezone}</Typography>
                  <Typography variant="h6">{data.currently.summary}</Typography>
                </Grid>
                <Grid item className={classes.rightAlign}>
                  <Typography variant="subtitle1" className={classes.greyLetter}>{`${data.currently.windSpeed} mph`}</Typography>
                  <Typography variant="subtitle2" className={classes.greyLetter}>{`Humedad ${data.currently.humidity}%`}</Typography>
                </Grid>
              </Grid>
            </DialogTitle>
            <DialogContent style={{overflow:'hidden'}}>
              <Grid 
                container 
                spacing={8} 
                direction="row"
                justify="center"
                alignItems="center"
              >
                <Grid item xs={6} className={classes.centerAlign}>
                  <img src={weatherIcons(data.currently.icon)} alt={data.currently.icon} className={classes.iconImage} />
                </Grid>
                <Grid item xs={6} className={classes.centerAlign}>
                  <Typography variant="h2">{data.currently.temperature}°</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell classes={{root: classes.tableCell}} className={classes.borderRight} align="center">
                          {moment.unix(data.daily.data[0].time).format('ddd')}
                        </TableCell>
                        <TableCell classes={{root: classes.tableCell}} className={classes.borderRight} align="center">
                          {moment.unix(data.daily.data[1].time).format('ddd')}
                        </TableCell>
                        <TableCell classes={{root: classes.tableCell}} className={classes.borderRight} align="center">
                          {moment.unix(data.daily.data[2].time).format('ddd')}
                        </TableCell>
                          <TableCell classes={{root: classes.tableCell}} align="center">
                          {moment.unix(data.daily.data[3].time).format('ddd')}
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell classes={{root: classes.tableCell}} className={classes.borderRight} align="center">
                          <Typography variant="subtitle1">{data.daily.data[0].temperatureHigh}</Typography>
                          <Typography variant="subtitle2" className={classes.greyLetter}>{data.daily.data[0].temperatureLow}</Typography>
                        </TableCell>
                        <TableCell classes={{root: classes.tableCell}} className={classes.borderRight} align="center">
                          <Typography variant="subtitle1">{data.daily.data[1].temperatureHigh}</Typography>
                          <Typography variant="subtitle2" className={classes.greyLetter}>{data.daily.data[1].temperatureLow}</Typography>
                        </TableCell>
                        <TableCell classes={{root: classes.tableCell}} className={classes.borderRight} align="center">
                          <Typography variant="subtitle1">{data.daily.data[2].temperatureHigh}</Typography>
                          <Typography variant="subtitle2" className={classes.greyLetter}>{data.daily.data[2].temperatureLow}</Typography>
                        </TableCell>
                        <TableCell classes={{root: classes.tableCell}} align="center">
                          <Typography variant="subtitle1">{data.daily.data[3].temperatureHigh}</Typography>
                          <Typography variant="subtitle2" className={classes.greyLetter}>{data.daily.data[3].temperatureLow}</Typography>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Grid>
                {responsive && (
                  <Fab color="primary" variant="extended" className={classes.fab} onClick={handleClose}>
                    <Close className={classes.extendedIcon} />
                  </Fab>)}
              </Grid>
            </DialogContent>
          </>
        :
        <>
          <DialogContent>
            <DialogContent style={{overflow:'hidden', textAlign: 'center'}}>
              <IconButton aria-label="Delete" onClick={handleClose} className={classes.closeIcon}>
                <Close fontSize="small" />
              </IconButton>
              <Typography variant="h5" align='center'>Lo sentimos, ha ocurrido un error!</Typography>
              <Fab color="primary" variant="extended" className={classes.fab} onClick={handleRetry}>
                <Refresh className={classes.extendedIcon} />
              </Fab>
            </DialogContent>
          </DialogContent> 
        </>
      : 
        <DialogContent className={classes.Aligner}>
          <CircularProgress className={classes.progress} />
        </DialogContent> 
      }
    </>
  );
}

export default withStyles(styles)(withMobileDialog()(DialogContentComponent));
