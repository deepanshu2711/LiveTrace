import { Location } from "./models/LocationModel.js";

export const saveLocationToMongo = async (locationEvent) => {
  try {
    await Location.create(locationEvent);
  } catch (error) {
    console.error("Failed to insert data into MongoDB ❌", error);
  }
};
