import React from "react";
import { FaStar } from "react-icons/fa6";

const Star = ({ star }) => {
  return (
    <>
      {star === 1 && <FaStar color="gold" size={25} />}
      {star === 2 && (
        <>
          <FaStar color="gold" size={25} />
          <FaStar color="gold" size={25} />
        </>
      )}
      {star === 3 && (
        <>
          <FaStar color="gold" size={25} />
          <FaStar color="gold" size={25} />
          <FaStar color="gold" size={25} />
        </>
      )}
      {star === 4 && (
        <>
          <FaStar color="gold" size={25} />
          <FaStar color="gold" size={25} />
          <FaStar color="gold" size={25} />
          <FaStar color="gold" size={25} />
        </>
      )}
      {star === 5 && (
        <>
          <FaStar color="gold" size={25} />
          <FaStar color="gold" size={25} />
          <FaStar color="gold" size={25} />
          <FaStar color="gold" size={25} />
          <FaStar color="gold" size={25} />
        </>
      )}
    </>
  );
};

export default Star;
