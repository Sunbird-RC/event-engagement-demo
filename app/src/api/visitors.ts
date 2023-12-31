import { useMutation, useQuery } from "react-query";
import { apiRoutes } from "../routes";
import { axiosInst } from "./axios";
import { Visitor } from "../types/visitor";
import { useKeycloak } from "@react-keycloak/web";

export const useVistorDetails = () => {
  const { keycloak } = useKeycloak();
    return useQuery({
        queryKey: ["visitorDet"],
        enabled: !!keycloak.authenticated,
        queryFn: () =>
            axiosInst
            .get<Visitor>(apiRoutes.VISITOR_DETAILS)
            .then((res) => {console.log(res.data); return (res.data)})
    });
  };

  export const useVistorRegister = () => {
    return useMutation({
        mutationKey: ["visitorReg"],
        mutationFn: (data: any) =>
          axiosInst
            .post<any>(apiRoutes.VISITOR_REG, data)
            .then((res) => {console.log('on register ', res); return  res})
            .catch((e) => (e))
      });
  };
  