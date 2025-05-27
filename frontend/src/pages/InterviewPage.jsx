// InterviewPage.js
import { useState } from "react";
import { getToken } from "../utils/api";
import VideoCall from "../components/VideoCall";
import RoomForm from "../components/RoomForm";

const InterviewPage = () => {
  const [tokenData, setTokenData] = useState("");

  const handleConnect = async ({ roomId, userName }) => {
    const res = await getToken(roomId, userName);
    setTokenData({ ...res.data });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {!tokenData ? (
        <div className="grid grid-cols-1 gap-8">
          {/* Room Form */}
          <RoomForm handleConnect={handleConnect} />
        </div>
      ) : (
        <VideoCall token={tokenData.token} serverUrl={tokenData.url} />
      )}
    </div>
  );
};

export default InterviewPage;
