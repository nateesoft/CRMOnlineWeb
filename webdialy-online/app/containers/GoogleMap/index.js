/**
 *
 * GoogleMap
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import MapMarker from './components/MapMarker';
import * as selectors from './selectors';

export function GoogleMap(props) {
  const handlePlace = () => {};

  return (
    <>
      <MapMarker {...props} lat={13.844903} lng={100.525943} onExit={handlePlace} />
    </>
  );
}

GoogleMap.propTypes = {};

const mapStateToProps = createStructuredSelector({
  googleMap: selectors.makeSelectGoogleMap(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(GoogleMap);
