import { StackActions } from "@react-navigation/native";
import { Href, useNavigationContainerRef, router } from "expo-router";

export const useNavigate = () => {
  const rootNavigation = useNavigationContainerRef();

  return (href: Href) => {
    rootNavigation.dispatch(StackActions.popToTop());
    router.replace(href);
  };
};

