import { useEffect, useRef } from "react";
import { AppState, AppStateStatus } from "react-native";
import { extractClipboardOtp } from "@/utils/extractClipboardOtp";

interface Props {
  enabled: boolean;
  onDetect: (otp: string) => void;
}

export const useClipboardOtpAutofill = ({ enabled, onDetect }: Props) => {
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    if (!enabled) return;

    const onChange = async (nextState: AppStateStatus) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextState === "active"
      ) {
        const otp = await extractClipboardOtp();
        if (otp) {
          onDetect(otp);
        }
      }

      appState.current = nextState;
    };

    const subscription = AppState.addEventListener("change", onChange);
    return () => subscription.remove();
  }, [enabled, onDetect]);
};

