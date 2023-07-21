import { useQuery } from "react-query";
import { apiRoutes } from "../routes";
import { Exhibit } from "../types/exhibit";
import { axiosInst } from "./axios";
import { useKeycloak } from "@react-keycloak/web";

interface ExhibitsResponse {
  visited: Exhibit[];
  unvisited: Exhibit[];
}

export const useExhibitsData = () => {
  const { keycloak } = useKeycloak();
  return useQuery({
    queryKey: ["exhibits"],
    enabled: !!keycloak.authenticated,
    queryFn: () => 
      axiosInst
        .get<ExhibitsResponse>(apiRoutes.EXHIBITS)
        .then((res) => {console.log('response ', res); return res.data})
    });
};

export const useExhibitsDataOnId = (exhibitId: string) => {
  const { keycloak } = useKeycloak();
  return useQuery({
    queryKey: ["exhibitsDet", exhibitId],
    enabled: !!keycloak.authenticated && !!exhibitId,
    queryFn: () =>
      axiosInst
        .get<Exhibit>(`${apiRoutes.EXHIBITS_DET}/${exhibitId}`)
        .then((res) => res.data)
  });
}

export const useExhibitsQrcode = (qrId: string) => {
  const { keycloak } = useKeycloak();
  return useQuery({
    queryKey: ["qrCodescan"],
    enabled: !!keycloak.authenticated && !!qrId,
    queryFn: () =>
      axiosInst
        .put<any>(`${apiRoutes.EXHIBIT_QRSCAN}/${qrId}`)
        .then((res) => {console.log('qr scan res ', res); return res.data})
  });
}
