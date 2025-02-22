'use client'
import { createContext, useState, useContext } from "react";

const RoomContext = createContext();

export const RoomProvider = ({ children }) => {
  const [room, setRoom] = useState({});

  const updateRoom = (newData) => {
    setRoom((prev) => ({ ...prev, ...newData }));
  };

  return (
    <RoomContext.Provider value={{ room, updateRoom }}>
      {children}
    </RoomContext.Provider>
  );
};

export const useRoomContext = () => useContext(RoomContext);
