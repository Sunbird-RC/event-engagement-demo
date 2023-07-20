import { useQuery } from "react-query";
import { apiRoutes } from "../routes";
import { axiosInst } from "./axios";
import { Badge } from "../types/badge";

export const useBadgeData = () => {
  return useQuery({
    queryKey: ["badges"],
    queryFn: () =>
      axiosInst.get<Badge[]>(apiRoutes.BADGE)
      .then((res) => res.data)
  });
};

export const useQrCode = (enabled: boolean) => {
  return useQuery({
    queryKey: ["qrCode"],
    enabled: enabled,
    queryFn: () =>
      axiosInst
        .get<string>(apiRoutes.QR_CODE)
        .then((res) => {console.log(res); return res;})
  });
};