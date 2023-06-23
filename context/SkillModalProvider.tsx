"use client";

import React, { useContext, useState } from "react";

type ModalMode =
  | "AddOffer"
  | "AddRequest"
  | "RemoveOffer"
  | "RemoveRequest"
  | "";

interface SkillModalContextType {
  mode: ModalMode;
  setMode: any;
  skill: any;
  setSkill: any;
}

const Context = React.createContext<SkillModalContextType | undefined>(
  undefined
);

export const useSkillModalContext = (): SkillModalContextType => {
  const context = useContext(Context);

  if (!context) {
    throw new Error(
      "useSkillModalContext must be used within a SkillModalProvider"
    );
  }

  return context;
};

export const SkillModalProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [skill, setSkill] = useState(null);
  const [mode, setMode] = useState<ModalMode>("");
  const value: SkillModalContextType = {
    skill,
    setSkill,
    mode,
    setMode,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};
