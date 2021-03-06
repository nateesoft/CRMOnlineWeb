import React from 'react';
import { compose, withProps, lifecycle } from 'recompose';
import { withScriptjs, withGoogleMap, GoogleMap, DirectionsRenderer } from 'react-google-maps';

const MapDirectionAB = compose(
  withProps({
    googleMapURL:
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyCE9HPrREFNujIAtNwsn20dKFfLj4TRXp0&libraries=geometry,drawing,places',
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap,
  lifecycle({
    componentDidMount() {
      const { origin, destination } = this.props;
      const DirectionsService = new window.google.maps.DirectionsService();

      DirectionsService.route(
        {
          origin: new window.google.maps.LatLng(origin.position.lat(), origin.position.lng()),
          destination: new window.google.maps.LatLng(
            destination.position.lat(),
            destination.position.lng(),
          ),
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            this.setState({
              lat: origin.position.lat(),
              lng: origin.position.lng(),
              directions: result,
              distance: result.routes[0].legs[0].distance.value,
              duration: result.routes[0].legs[0].duration.value,
            });
          }
        },
      );
    },
  }),
)(props => {
  if (props.distance) {
    props.onExit(props.distance, props.duration);
  }
  const latValue = props.lat || 13.828941;
  const lngValue = props.lng || 100.525943;

  const position = new window.google.maps.LatLng(latValue, lngValue) || {
    lat: latValue,
    lng: lngValue,
  };
  return (
    <GoogleMap defaultZoom={7} defaultCenter={position}>
      {props.directions && <DirectionsRenderer directions={props.directions} />}
    </GoogleMap>
  );
});

export default MapDirectionAB;
