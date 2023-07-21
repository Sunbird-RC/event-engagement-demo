import { useQuery } from "react-query";
import { apiRoutes } from "../routes";
import { axiosInst } from "./axios";

import { useKeycloak } from "@react-keycloak/web";
import { LeaderBoardResponse } from "../types/leaderboard";

export const useLeaderboardData = () => {
  const { keycloak } = useKeycloak();
  return useQuery({
    queryKey: ["leaderboard"],
    enabled: !!keycloak.authenticated,
    queryFn: () => 
      axiosInst
        .get<LeaderBoardResponse>(apiRoutes.LEADER_BOARD)
        .then((res) => {console.log('response ', res); return res.data})
    });
};