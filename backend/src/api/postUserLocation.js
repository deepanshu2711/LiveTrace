import { sendMessage } from "../kafka/producer.js";

export const postUserLoacation = async (req, res) => {
  const { userId } = req.params;
  const { lat, long } = req.body;
  const locationEvent = {
    userId,
    lat,
    long,
  };
  console.log(locationEvent);
  try {
    await sendMessage(userId, "user-location", locationEvent);
    return res.status(200).json({ message: "Location sent successfully" });
  } catch (e) {
    console.log("Error while postUserLoacation");
    return res.status(500).json({ message: "something went wrong" });
  }
};
