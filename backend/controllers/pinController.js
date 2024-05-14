const mongoose = require("mongoose");
const Pin = require("../models/Pin");

const addPin = async (req, res) => {

  const user = new mongoose.Types.ObjectId(req.body.user);
  const { title, desc, rating, lat, lng } = req.body;

  const foundCoordinate = await Pin.findOne({lat, lng}).lean();
  if(foundCoordinate) return res.sendStatus(400);
  const newPins = new Pin({
    user,
    title,
    desc,
    rating,
    lat,
    lng,
  });

  await newPins.save();

  res.status(201).json(newPins);
};

const getPins = async (req, res) => {
  const pin = await Pin.find({})
    .populate(
      "user",
      " -_id -email -password -createdAt -updatedAt -__v"
    )
    .lean();
  if (!pin) return res.sendStatus(400);
  res.json(pin);
};

const removePin = async (req, res) => {
   const pinId = req.params.id;
   const pin = await Pin.findById(pinId);
   if(!pin) return res.sendStatus(400);

   await Pin.deleteOne({_id: pinId});
   
   return res.sendStatus(200)
}

module.exports = { addPin, getPins, removePin };
