import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import { QueryClient, QueryClientProvider } from "react-query";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Interceptor from "./Interceptor";
import keycloak from "./keycloak";
import { routes as appRoutes } from "./routes";
import { theme } from "./theme";

const queryClient = new QueryClient();

function App() {
  return (
    <ReactKeycloakProvider authClient={keycloak}
      initOptions={{
        checkLoginIframe: false,
      }}
      >
      <Interceptor />
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline enableColorScheme />
          <Box height="100vh" display="flex" flexDirection="column">
            <Router>
              <Routes>
                {appRoutes.map((route) => (
                  <Route
                    key={route.key}
                    path={route.path}
                    element={<route.component />}
                  />
                ))}
              </Routes>
            </Router>
          </Box>
        </ThemeProvider>
      </QueryClientProvider>
    </ReactKeycloakProvider>
  );
}

export default App;
