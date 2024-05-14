import * as React from "react";
import { useState } from "react";
import Map, { Marker, Popup } from "react-map-gl";
import PopUpContent from "./PopUpContent";
import { logOut } from "../slices/user";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetPinsQuery } from "../api/pinEndpoints";
import { useSelector } from "react-redux";
import { user } from "../slices/user";

const MapApp = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [coordinate, setCordinate] = useState({ lng: -122.4, lat: 37.8 });
  const [view, setView] = useState(false);
  const [pinUser, setPinUser] = useState(null);

  const navigate = useNavigate();

  const currentUser = useSelector((state) => user(state));
  const dispatch = useDispatch();
  const { data: pins } = useGetPinsQuery();

  const setCoordinate = (e) => {
    const { lng, lat } = e.lngLat;
    setCordinate((prev) => ({ lng: lng, lat: lat }));
    setShowPopup(true);
    if(pinUser?.lat && pinUser?.lng){
        setView(true);
        return
    }
   
  };

  function logOutHandler(e) {
    e.preventDefault();
    dispatch(logOut());
    navigate("/login");
  }

  function marker(title, desc, user, rating, lng, lat) {
   
    setPinUser((prev) => ({ title, desc, user, rating, lng, lat }));
   
  }

  console.log(view)

  return (
    <>
      <Map
        mapboxAccessToken="pk.eyJ1IjoiZnVzZWluaW1vIiwiYSI6ImNscW5teHJ4YjM3ZGYyam5tcTRjN2ltZm4ifQ.Is6ydHPh7Ivc2cGbTOK3Iw"
        initialViewState={{
          longitude: -122.4,
          latitude: 37.8,
          zoom: 14,
        }}
        style={{ height: "750px" }}
        mapStyle="mapbox://styles/fuseinimo/clqntpslc00rf01qu0bc25u5o"
        onDblClick={setCoordinate}
       
      >
        <button
          className="btn btn-primary"
          style={{ position: "absolute", right: 40, top: 10 }}
          onClick={logOutHandler}
        >
          logout
        </button>
        {pins?.map((pin) => {
          return (
            <>
              <Marker
                longitude={pin.lng}
                latitude={pin.lat}
                anchor="bottom"
                key={pin._id}
                onClick={() =>
                  marker(
                    pin.title,
                    pin.desc,
                    pin.user?.username,
                    pin.rating,
                    pin.lng,
                    pin.lat

                  )
                }
                color={
                  pin?.user?.username === currentUser.user ? "#4573a1" : "red"
                }
              ></Marker>
            </>
          );
        })}

        {/* { view && (<Popup
            longitude={pinUser.lng}
            latitude={pinUser.lat}
            anchor="bottom"
            onClose={() => setShowPopup(false)}
            style={{ rotate: "4deg" }}
          >
            <PopUpContent
              lat={coordinate?.lat}
              lng={coordinate?.lng}
              view={view}
              title={pinUser?.title}
              desc={pinUser?.desc}
              userPin={pinUser?.user}
              rating={pinUser?.rating}
            />
            <h1>Hello</h1>
            
          </Popup>)} */}
        {showPopup && (
          <Popup
            longitude={coordinate?.lng}
            latitude={coordinate?.lat}
            anchor="bottom"
            onClose={() => {setShowPopup(false); setView(false); setPinUser(null)}}
            style={{ rotate: "4deg" }}
          >
            <PopUpContent
              lat={coordinate?.lat}
              lng={coordinate?.lng}
              view={view}
              title={pinUser?.title}
              desc={pinUser?.desc}
              userPin={pinUser?.user}
              rating={pinUser?.rating}
            />
            
          </Popup>
        )}
      </Map>
    </>
  );
};

export default MapApp;
