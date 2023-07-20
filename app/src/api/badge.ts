import { useQuery } from "react-query";
import { apiRoutes } from "../routes";
import { axiosInst } from "./axios";
import { Badge } from "../types/badge";
import { useKeycloak } from "@react-keycloak/web";

export const useBadgeData = () => {
  
  const { keycloak } = useKeycloak();
  return useQuery({
    queryKey: ["badges"],
    enabled: keycloak.authenticated,
    queryFn: () =>
      axiosInst.get<Badge[]>(apiRoutes.BADGE)
      .then((res) => res.data)
  });
};

export const useQrCode = () => {

  const { keycloak } = useKeycloak();
  return useQuery({
    queryKey: ["qrCode"],
    enabled: keycloak.authenticated,
    queryFn: () =>
      axiosInst
        .get<string>(apiRoutes.QR_CODE)
        .then((res) => {console.log(res); return res;})
  });
};