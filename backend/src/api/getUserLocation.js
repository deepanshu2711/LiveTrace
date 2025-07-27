import { Location } from "../models/LocationModel.js";

export const getUserLocation = async (req, res) => {
  const { userId } = req.params;

  try {
    const locationKey = `user:location:${userId}`;
    let locationData = await redisClient.get(locationKey);

    if (!locationData) {
      const latestLocation = await Location.findOne({ userId })
        .sort({ createdAt: -1 })
        .lean();

      if (!latestLocation) {
        return res.status(404).json({ message: "Location not found" });
      }

      locationData = JSON.stringify({
        lat: latestLocation.lat,
        long: latestLocation.long,
        timestamp: latestLocation.createdAt,
      });

      await redisClient.set(locationKey, locationData, {
        EX: 30,
      });
    }

    return res.json({ location: JSON.parse(locationData) });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Cannot get user location" });
  }
};
