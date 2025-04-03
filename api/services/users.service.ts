import { useQuery } from "@tanstack/react-query";
import api from "../client.api";

export const useUserProfile = () =>
  useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => {
      const { data } = await api.get("/v1/auth/me");
      return data;
    },
  });
