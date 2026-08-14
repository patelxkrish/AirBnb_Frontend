import React, { useEffect, useState } from "react";
import { onWakingUp } from "../api/client";

function WakingUpBanner() {
  const [waking, setWaking] = useState(false);

  useEffect(() => {
    return onWakingUp(setWaking);
  }, []);

  if (!waking) return null;

  return (
    <div
      className="text-center py-2"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 2000,
        background: "#fff3cd",
        color: "#664d03",
        fontSize: "0.9rem",
      }}
    >
      Waking up the server — this can take up to a minute on the first request…
    </div>
  );
}

export default WakingUpBanner;
