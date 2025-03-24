import { v1client } from "./client.api";

export const signInWithGoogle = async (idToken: string) => {
  const result = await v1client.post("/auth/google", {
    idToken,
  });

  return result.data;
};
