"use client";

import dynamic from "next/dynamic";

const Map = dynamic(() => import("@/components/map"), { ssr: false });

export default function Page() {
  const initialPosition = [30.71667050566985, 76.84020015189992];

  return <Map initialPosition={initialPosition} />;
}
