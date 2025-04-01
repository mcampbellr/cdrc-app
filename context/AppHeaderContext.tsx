import React, { createContext, useContext, useState, ReactNode } from "react";

type HeaderRightElement = ReactNode | null;

interface AppHeaderContextProps {
  title: string;
  right: HeaderRightElement;
  showLogo: boolean;
  setShowLogo: (show: boolean) => void;
  setRight: (element: HeaderRightElement) => void;
  setTitle: (title: string) => void;
}

const AppHeaderContext = createContext<AppHeaderContextProps>({
  right: null,
  showLogo: false,
  title: "",
  setShowLogo: () => {},
  setRight: () => {},
  setTitle: () => {},
});

export const AppHeaderProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [right, setRight] = useState<HeaderRightElement>(null);
  const [showLogo, setShowLogo] = useState<boolean>(true);
  const [title, setTitle] = useState<string>("");

  return (
    <AppHeaderContext.Provider
      value={{ right, setRight, showLogo, setShowLogo, title, setTitle }}
    >
      {children}
    </AppHeaderContext.Provider>
  );
};

export const useAppHeader = () => useContext(AppHeaderContext);
