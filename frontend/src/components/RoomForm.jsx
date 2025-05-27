// RoomForm.js
import React, { useState } from "react";

const RoomForm = ({ handleConnect }) => {
  const [roomId, setRoomId] = useState("");
  const [userName, setUserName] = useState("");

  const onSubmit = () => {
    if (!roomId || !userName) {
      alert("Please provide both Room ID and Name.");
      return;
    }
    handleConnect({ roomId, userName });
  };

  return (
    <div className="space-y-4">
      <div>
        <label
          htmlFor="roomId"
          className="block text-sm font-medium text-gray-700"
        >
          Room ID
        </label>
        <input
          id="roomId"
          type="text"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter Room ID"
        />
      </div>
      <div>
        <label
          htmlFor="userName"
          className="block text-sm font-medium text-gray-700"
        >
          Name
        </label>
        <input
          id="userName"
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter your name"
        />
      </div>
      <div>
        <button
          onClick={onSubmit}
          className="mt-4 w-full py-2 px-4 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700"
        >
          Join Room
        </button>
      </div>
    </div>
  );
};

export default RoomForm;
