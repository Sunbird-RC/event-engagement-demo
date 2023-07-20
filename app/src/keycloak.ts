import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  url: import.meta.env.PROD || true
    ? "https://api.up-ai.in/auth"
    : "http://localhost:8080/auth",
  realm: "sunbird-rc",
  clientId: "registry-frontend",
});

export default keycloak;
