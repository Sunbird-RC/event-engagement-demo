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

const HomePage: FC<{}> = (): ReactElement => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        backgroundColor: "primary.main",
        flexGrow: 1,
        display: "flex",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <img src={logo} style={{ position: "absolute" }} />
      <Box sx={{ my: 3, mx: 2, color: "white", marginTop: "10rem" }}>
        <Box mt={8} sx={{ display: "flex", justifyContent: "center" }}>
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
            <Typography color="white" variant="body1" mt={'16%'} mb={'4%'}>
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
                    <ListItemButton dense>
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

        <img src={footer} style={{ position: "relative" }} />
        <Button
          variant="contained"
          onClick={() => navigate(pageRoutes.REGISTER)}
          sx={{
            background: "white",
            position: "absolute",
            left: "50%",
            top: "95%",
            transform: "translate(-50%, -50%)",
            color: "primary.main",
          }}
        >
          Start the experience
        </Button>
      </Box>
    </Box>
  );
};

export default HomePage;
