import * as Clipboard from "expo-clipboard";

export const extractClipboardOtp = async (): Promise<string | null> => {
  try {
    const clipboardContent = (await Clipboard.getStringAsync()).trim();
    const match = clipboardContent.match(/\b\d{6}\b/);
    return match ? match[0] : null;
  } catch (error) {
    console.warn("Failed to read clipboard:", error);
    return null;
  }
};
