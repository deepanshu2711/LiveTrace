"use client";
import { useRef, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [sendingLocation, setSendingLoacation] = useState(false);
  const intervalRef = useRef(null);

  const startTracking = () => {
    if (intervalRef.current) return;
    setSendingLoacation(true);

    intervalRef.current = setInterval(() => {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            await axios.post("http://localhost:5090/api/user/location/1", {
              lat: latitude.toString(),
              long: longitude.toString(),
            });
            console.log("✅ Location sent:", latitude, longitude);
          } catch (error) {
            console.error("❌ Failed to send location", error);
            setSendingLoacation(false);
          }
        },
        (error) => {
          console.error("❌ Error getting location", error);
        },
      );
    }, 2000);
  };

  const stopTracking = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      console.log("📍 Stopped sending location.");
      setSendingLoacation(false);
    }
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center space-y-4">
      <Button onClick={startTracking}>
        {sendingLocation ? "Sending Location" : "Start Sending Location"}
      </Button>
      <Button variant="destructive" onClick={stopTracking}>
        Stop Sending Location
      </Button>
    </div>
  );
}
