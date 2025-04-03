import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/data/queryKeys";
import api from "@/api/client.api";
import { API_ROUTES } from "@/data/services.types";
import { User } from "@/data/users.interface";

export const useUserProfileService = (
  options?: Omit<UseQueryOptions<User, Error, User>, "queryKey" | "queryFn">,
) =>
  useQuery<User, Error>({
    queryKey: QUERY_KEYS.userProfile,
    queryFn: async () => {
      const { data } = await api.get<User>(API_ROUTES.auth.profile);
      return data;
    },
    ...options,
  });
