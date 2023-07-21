import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  url: "https://api.up-ai.in/auth",
  realm: "sunbird-rc",
  clientId: "registry-frontend",
});

export default keycloak;
