"use client";

import React, { useContext, useState } from "react";

interface MyContextType {
  editSkill: any;
  setEditSkill: any;
  showDialog: any;
  setShowDialog: any;
  showDeleteModal: any;
  setShowDeleteModal: any;
}

const Context = React.createContext<MyContextType | undefined>(undefined);

export const useMyContext = (): MyContextType => {
  const context = useContext(Context);

  if (!context) {
    throw new Error(
      "useCustomContext must be used within a CustomContextProvider"
    );
  }

  return context;
};

export const Provider = ({ children }: { children: React.ReactNode }) => {
  const [editSkill, setEditSkill] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const value: MyContextType = {
    editSkill,
    setEditSkill,
    showDialog,
    setShowDialog,
    showDeleteModal,
    setShowDeleteModal,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};
