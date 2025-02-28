'use client'
import { createContext, useState, useContext } from "react";

const RoomDetailContext = createContext();

export const RoomDetailProvider = ({ children }) => {
  const [roomDetail, setRoomDetail] = useState({});

  const updateRoomDetail = (newData) => {
    setRoomDetail((prev) => ({ ...prev, ...newData }));
  };

  return (
    <RoomDetailContext.Provider value={{ roomDetail, updateRoomDetail }}>
      {children}
    </RoomDetailContext.Provider>
  );
};

export const useRoomDetailContext = () => useContext(RoomDetailContext);
