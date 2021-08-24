import { Loader } from "@googlemaps/js-api-loader";
import "./index.css";
import { useEffect, useRef, useState } from "react";
// import { useParams } from "react-router";

const loader = new Loader({
  apiKey: process.env.REACT_APP_API_KEY_GOOGLE_MAPS,
  version: "weekly",
  libraries: ["places"],
});

const mapOptions = {
  center: {
    lat: 51.044308,
    lng: -114.063087,
  },
  zoom: 12,
};

const Map =({surveyId})=>{
  const [postalCodeA, setPostalCodeA] = useState("")
  const [postalCodeB, setPostalCodeB] = useState("")
  const [postalCodeValidationError, setPostalCodeValidationError] = useState("")
  const map = useRef(null);
  // let { surveyId } = useParams();

  useEffect(() => {
    fetch(`/api/maps?surveyId=${surveyId}`)
    .then(function(response){
      // JSON that is returned from the server must be converted to a JS object asynchronously.
      if (!response.ok) {
        throw new Error('Not 200 OK');
      }
      return response.json();
    })
    .then(function(data){
      // Any code that depends on the `data` must go in this block
      const postalCodes = data;
      console.log(data);
      
      // Promise
      loader
      .load()
      .then((google) => {
        const googleMap = new google.maps.Map(map.current, mapOptions);
        const bounds = new google.maps.LatLngBounds();

        const geocoder = new google.maps.Geocoder();
        // console.log("postalCodes", postalCodes)

        // Add the locations of potential offices (taken from postal code input fields) onto the map:
        postalCodeA && 
        geocoder
            .geocode({ address: postalCodeA, region: "CA" })
            .then(({ results }) => {
              new google.maps.Marker({
                map: googleMap,
                position: results[0].geometry.location,
                icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
                label: "Office A",
                animation: google.maps.Animation.DROP,
                zIndex: 5
              });
              bounds.extend(results[0].geometry.location);
              googleMap.fitBounds(bounds);
            })
            .catch((err) =>
              alert("Geocode was not successful for the following reason: " + err)
            );
        postalCodeB && 
        geocoder
            .geocode({ address: postalCodeB, region: "CA" })
            .then(({ results }) => {
              new google.maps.Marker({
                map: googleMap,
                position: results[0].geometry.location,
                icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
                label: "Office B",
                animation: google.maps.Animation.DROP,
                zIndex: 5
              });
              bounds.extend(results[0].geometry.location);
              googleMap.fitBounds(bounds);
            })
            .catch((err) =>
              alert("Geocode was not successful for the following reason: " + err)
            );

        for (var i = 0; i < postalCodes.length; ++i) {
          console.log("postalCodes[i]", i, postalCodes[i])
          geocoder
            .geocode({ address: postalCodes[i], region: "CA" })
            .then(({ results }) => {
              // googleMap.setCenter(results[0].geometry.location);
              new google.maps.Marker({
                map: googleMap,
                position: results[0].geometry.location,
              });
              bounds.extend(results[0].geometry.location);
              googleMap.fitBounds(bounds);
            })
            .catch((err) =>
              alert("Geocode was not successful for the following reason: " + err)
            );
        }
      })
      .catch((err) => {
        // do something
        console.log(err);
      });

    })
    .catch(function(err){
      // An error or `reject` from any of the above `.then()` blocks will end up here.
      console.log(err);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postalCodeA, postalCodeB]);

  // POSTAL CODE INPUT
  let possibleCodeA;
  const handleChangeA = (e) => {
    possibleCodeA = e.target.value;
    if (
      (/^[abceghjklmnprstvxy][0-9][abceghjklmnprstvwxyz]\s?[0-9][abceghjklmnprstvwxyz][0-9]$/i.test(possibleCodeA) ||
      /^[0-9]{5}(?:-[0-9]{4})?$/.test(possibleCodeA)) &&
      possibleCodeA.trim().length > 0
      ) {
        setPostalCodeA(possibleCodeA);
        setPostalCodeValidationError("")
    } else {
      setPostalCodeValidationError("Please enter a valid postal code.")
    }
  }
  let possibleCodeB;
  const handleChangeB = (e) => {
    possibleCodeB = e.target.value;
    if (
      (/^[abceghjklmnprstvxy][0-9][abceghjklmnprstvwxyz]\s?[0-9][abceghjklmnprstvwxyz][0-9]$/i.test(possibleCodeB) ||
      /^[0-9]{5}(?:-[0-9]{4})?$/.test(possibleCodeB)) &&
      possibleCodeB.trim().length > 0
      ) {
        setPostalCodeB(possibleCodeB);
        setPostalCodeValidationError("")
    } else {
      setPostalCodeValidationError("Please enter a valid postal code.")
    }
  };

  return (
    <div className="App map-and-postal-code-input">
      <div className="map-input-container">
        <div className="map-input-individual">
          <label>Enter postal code for Office A:</label>
          <input 
            type="text" 
            placeholder="Postal code A" 
            value={possibleCodeA}
            onChange={handleChangeA}
            />
        </div>
        <div className="map-input-individual">
          <label>Enter postal code for Office B:</label>
          <input 
            type="text" 
            placeholder="Postal code B" 
            value={possibleCodeB}
            onChange={handleChangeB}
          />
        </div>
      </div>
      <div style={{color: "red", height: "20px", paddingBottom: "20px"}}>{postalCodeValidationError}</div>
      <div ref={map} className="map"></div>
    </div>
  );
}

export default Map;