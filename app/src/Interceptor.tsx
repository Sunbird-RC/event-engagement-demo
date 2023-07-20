import { useKeycloak } from "@react-keycloak/web";
import { useEffect } from "react";
import { axiosInst } from "./api/axios";

const Interceptor: React.FC<{}> = () => {
  const { keycloak, initialized } = useKeycloak();

  useEffect(() => {
    let interceptorId: number;
    if (!initialized) {
      return;
    }
    if (keycloak.authenticated) {
      interceptorId = axiosInst.interceptors.request.use(
        async (config) => {
          config.headers.set("Authorization", `Bearer ${keycloak.token}`);
          return config;
        },
        (err) => Promise.reject(err),
      );
    } else {
      console.log('expired')
    }
    return () => {
      if (interceptorId) {
        axiosInst.interceptors.request.eject(interceptorId);
      }
    };
  }, [keycloak.authenticated, initialized]);

  return null;
};

export default Interceptor;
