import { Loader } from "@googlemaps/js-api-loader";
import "./index.css";
import { useEffect, useRef } from "react";
import { useParams } from "react-router";

const loader = new Loader({
  apiKey: "AIzaSyAB9QM8hkaDZ82FGPoPzN6Cf1q28aN-nGU",
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



const Map =()=>{
  const map = useRef(null);
  let { surveyId } = useParams();

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

        for (var i = 0; i < postalCodes.length; ++i) {
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
  }, []);

  return (
    <div className="App">
      <div ref={map} className="map"></div>
    </div>
  );
}

export default Map;