import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom'
import { withGoogleMap, GoogleMap, withScriptjs, InfoWindow, Marker } from "react-google-maps";
import Geocode from "react-geocode";
import { useTranslation } from 'react-i18next'

import {
	Col, 
	FormGroup,
} from 'reactstrap';

import styled from 'styled-components'

import axios from "axios";
import { BASIC_URL } from '../config/config';

import { GOOGLE_MAP_KEY, GOOGLE_MAP_LANGUAGE, GOOGLE_MAP_DEFAULT_LAT, GOOGLE_MAP_DEFAULT_LNG } from '../config/config';

Geocode.setApiKey(GOOGLE_MAP_KEY);
Geocode.enableDebug();

const Map = ({ setFormState, form }) => {

	const [address, setAddress] = useState('');
    const [zoom, setZoom] = useState(11);
	const [mapPosition, setMapPosition] = useState( { lat: GOOGLE_MAP_DEFAULT_LAT, lng:GOOGLE_MAP_DEFAULT_LNG} );

	const { t } = useTranslation('map');
	
	useEffect(() => {
		Geocode.fromLatLng(mapPosition.lat, mapPosition.lng).then(
			response => {
				let address = response.results[0].formatted_address;

				setAddress(( address ) ? address : '');
			},
			error => {
				console.error(error);
			}
		);
	
	}, []);
	const onMouseClick = (t) => {
		let newLat = t.latLng.lat();
		let newLng = t.latLng.lng();

		// setMapPosition({lat: newLat, lng: newLng});

		Geocode.fromLatLng(newLat, newLng).then(
			response => {
				let address = response.results[0].formatted_address;
				setAddress(( address ) ? address : '');	
			},
			error => {
				console.error(error);
			}
		);
	}
	
	const onMarkerDragEnd = ( event ) => {
		let newLat = event.latLng.lat(),
			newLng = event.latLng.lng();

		Geocode.fromLatLng(newLat, newLng).then(
			response => {
				let address = response.results[0].formatted_address;

				setAddress(( address ) ? address : '');
				setMapPosition({lat: newLat, lng: newLng});

			},
			error => {
				console.error(error);
			}
		);	
    };
  
	const NextBtn = styled(Link)`
		&:hover i {
			padding-left: 10px;
		}
		& i {
			padding-left: 5px;
			transition: all 0.5s ease;
		}
		background-color: #49b7d9;
		border-color: #5db9d6;
		margin-right: 20px;
	`

	const NextBtnClicked = async (e) => {
		e.preventDefault();

		let newSurvey = {...form.survey, "location": address};

		await axios.post(BASIC_URL + "/surveyData", newSurvey)
			.then(res => {

				if( res.data.success === true ) {
					//Go to current location selection window with boolean return value
					setFormState({ ...form, isSuccess: true, progress: 2 })
				} else {
					//Go to current location selection window with boolean return value
					setFormState({ ...form, isSuccess: false, progress: 2 })
				}

			})
	}

	function handleZoomChanged() {
		setZoom(this.getZoom()); //current zoom
	}

	const AsyncMap = withScriptjs(
		withGoogleMap(
			props => (
				<GoogleMap
					google={props.google}
					defaultZoom={ zoom }
					defaultCenter={{ lat:mapPosition.lat, lng: mapPosition.lng }}
					onZoomChanged={handleZoomChanged}
				>
					<Marker google={props.google}
							name={'Dolores park'}
							draggable={true}
							onDragEnd={ onMarkerDragEnd }
							position={{ lat: mapPosition.lat, lng: mapPosition.lng }}
					/>
					<Marker />
				</GoogleMap>
			)
		)
	);

	const map = <div>
		<FormGroup row>
			<Col xl={12}>
				<h2 style={{fontSize:30, fontWeight: 'normal'}} className="text-center">{t('header')}</h2>
			</Col>
		</FormGroup>
		
		<FormGroup row>
			<Col xl={6} lg={6} sm={8} xs={12} style={{marginTop: 10}}>
				<input type="text" name="address" className="form-control" readOnly="readOnly" value={ address }/>
			</Col>
			<Col xl={6} lg={6} sm={4} xs={12} style={{marginTop: 10}}>
				<NextBtn className="btn btn-primary float-right" onClick={NextBtnClicked}>
					{t('NextButtonLabel')}
					<i className="fas fa-arrow-right ml-1"></i>
				</NextBtn>
			</Col>
		</FormGroup>      

		<AsyncMap
			googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAP_KEY}&language=${GOOGLE_MAP_LANGUAGE}&libraries=places`}
			loadingElement={
				<div style={{ height: `100%` }} />
			}
			containerElement={
				<div style={{ height: '600px' }} />
			}
			mapElement={
				<div style={{ height: `100%` }} />
			}
		/>
	</div>

	return(
		map
	)
}

export default Map
