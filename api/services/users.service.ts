import { useQuery } from "@tanstack/react-query";
import api from "../client.api";
import { QUERY_KEYS } from "@/data/queryKeys";

export const useUserProfile = () =>
  useQuery({
    queryKey: QUERY_KEYS.userProfile,
    queryFn: async () => {
      const { data } = await api.get("/v1/auth/me");
      return data;
    },
  });
