import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { FC, ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import footer from "../assets/footer.svg";
import logo from "../assets/logo.svg";
import { pageRoutes } from "../routes";
import { useKeycloak } from "@react-keycloak/web";

const HomePage: FC<{}> = (): ReactElement => {
  const navigate = useNavigate();
  const { keycloak } = useKeycloak();

  const handleNavigate = () => {
    if (keycloak.authenticated) {
      navigate(pageRoutes.EXHIBITS_HOME);
    } else {
      navigate(pageRoutes.REGISTER)
    }
  }

  return (
    <Box
      sx={{
        backgroundColor: "primary.main",
        flexGrow: 1,
        display: "flex",
        justifyContent: "center",
        textAlign: "center",
        flexDirection: 'column'
      }}
    >
      <img src={logo} style={{ position: "sticky" }} />
      <Box sx={{ my: 3, mx: 2, color: "white", marginTop: "2rem" }}>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Box width={"60%"}>
            <Typography
              gutterBottom
              variant="h5"
              component="h5"
              color={"white"}
              fontWeight={"bold"}
            >
              WELCOME TO UP@AI ANUBHAV
            </Typography>
          </Box>
        </Box>
        <Typography variant="body1">
          where we will define the future together
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Box width={"80%"}>
            <Typography color="white" variant="body1" mt={'12%'} mb={'4%'}>
              Up@ AI ANUBHAV App will help you immerse in the exhibition while
              Showcasing the Power of Credentialing.
            </Typography>
            <List sx={{ width: "100%", alignItems: "center" }}>
              {[
                "Know about the exhibits",
                "Play Quiz to win Badges",
                "Earn exciting Rewards through Credential Badges!",
              ].map((value) => {
                return (
                  <ListItem key={value}>
                    <ListItemButton dense sx={{paddingTop: '0 !important', paddingBottom: '0 !important'}}>
                      <ListItemIcon>
                        <TaskAltOutlinedIcon
                          sx={{ color: "white" }}
                        ></TaskAltOutlinedIcon>
                      </ListItemIcon>
                      <ListItemText primary={`${value}`} />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>
        </Box>

      </Box>
      <Box style={{position:'sticky', display: 'flex', justifyContent: 'center'}}>
        <Box mt={15} style={{position:'absolute'}}>
          <Button
            variant="contained"
            onClick={handleNavigate}
            sx={{
              background: "white",
              color: "primary.main",
              alignItems: 'center'
            }}
          >
            Start the experience
          </Button>
        </Box>
        <img src={footer} style={{width:'100%'}} />
      </Box>
    </Box>
  );
};

export default HomePage;
