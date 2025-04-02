import { useAppHeader } from "@/context/AppHeaderContext";
import { useFocusEffect } from "expo-router";
import { ReactNode, useCallback } from "react";

export function useHeaderRight(element: ReactNode) {
  const { setRight } = useAppHeader();

  useFocusEffect(
    useCallback(() => {
      setRight(element);

      return () => {
        setRight(null);
      };
    }, [element, setRight]),
  );
}

export function useHeaderLogo(show: boolean) {
  const { setShowLogo } = useAppHeader();

  useFocusEffect(
    useCallback(() => {
      setShowLogo(show);

      return () => {
        setShowLogo(true);
      };
    }, [show, setShowLogo]),
  );
}

export function useHeaderTitle(title: string) {
  const { setTitle, setShowLogo } = useAppHeader();

  useFocusEffect(
    useCallback(() => {
      setTimeout(() => {
        setShowLogo(false);
        setTitle(title);
      }, 500);

      return () => {
        setTitle("");
        setShowLogo(true);
      };
    }, [title, setTitle]),
  );
}
