import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Divider,
  IconButton,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { useKeycloak } from "@react-keycloak/web";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBadgeData } from "../api/badge";
import { useVistorDetails } from "../api/visitors";
import Badge1 from "../assets/Badge1.svg";
import Badge2 from "../assets/Badge2.svg";
import BgHeader2 from "../assets/BgHeader2.svg";
import appName from "../assets/appName.png";
import logo from "../assets/logo.svg";
import menuEvent from "../assets/menuEvent.svg";
import { pageRoutes } from "../routes";

interface ToolbarProps {
  show: boolean;
  badgeOpt: boolean;
  toolbarHeight: boolean;
  hideBtn: boolean;
}

function ToolBar(props: ToolbarProps) {
  let navigate = useNavigate();
  const { keycloak } = useKeycloak();

  const { data: visitorDetails } = useVistorDetails();

  const { hideBtn, show, badgeOpt, toolbarHeight } = props;
  const [isOpen, setIsopen] = useState(false);

  const ToggleSidebar = () => {
    isOpen === true ? setIsopen(false) : setIsopen(true);
  };

  const { data: badgeData } = useBadgeData();
  let badgeWonCount = 0
  let badgeLeftCount = 0
  if(badgeData && badgeData?.length > 0) {
    badgeData.forEach(bg => {
      if(bg.badgeWon) {
        badgeWonCount++
      } else {
        badgeLeftCount++
      }
    })
  }

  const handleNavigation = (label: any) => {
    let path = "";
    switch (label) {
      case "Exhibits":
        ToggleSidebar()
        path = pageRoutes.EXHIBITS_HOME;
        navigate(path);
        break;
      case "Leader board":
        path = pageRoutes.LEADER_BOARD;
        navigate(path);
        break;
      case "Credential Verification":
        path = pageRoutes.CREDENTIAL_VERIFY;
        navigate(path);
        break;
      case "Contact us":
        path = pageRoutes.CONTACT_US;
        navigate(path);
        break;
      case "Logout":
        keycloak.logout().then(() => {
          navigate(pageRoutes.REGISTER);
        });
        break;
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  const listItem = [
    { label: "Exhibits", showIcon: true },
    { label: "Leader board", showIcon: true },
    { label: "Credential Verification", showIcon: true },
    { label: "Contact us", showIcon: true },
    { label: "Logout", showIcon: false },
  ];
  return (
    <>
      <Box className="App wrapper" id="page-wrap" position={'sticky'}>
        <AppBar position="static">
          <Toolbar sx={{ position: "absolute", padding: "0" }}>
            <img
              src={BgHeader2}
              style={{
                marginTop: toolbarHeight ? "-2rem" : "-5rem",
                width: "100vw",
                height: "192px",
                objectFit: "cover",
              }}
            />
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-label="menu"
              sx={{
                position: "absolute",
                transform: "translate(0%, -50%)",
                top: "2.8rem",
                left: "2%",
              }}
            >
              {!hideBtn ? (
                show ? (
                  <MenuRoundedIcon onClick={ToggleSidebar} fontSize="large" />
                ) : (
                  <ArrowBackOutlinedIcon onClick={goBack} fontSize="large" />
                )
              ) : (
                <></>
              )}
            </IconButton>
            <div></div>
            <img
              src={appName}
              style={{
                position: "absolute",
                transform: "translate(-50%, -50%)",
                left: "50%",
                top: "2.8rem",
              }}
            />
            {show ? (
              <>
                <QrCodeScannerIcon
                  onClick={() => {
                    navigate(pageRoutes.SCAN_QR);
                  }}
                  style={{
                    position: "absolute",
                    transform: "translate(-50%, -50%)",
                    right: "10%",
                    fontSize: '2rem',
                    top: "2.8rem",
                  }}
                />
                <span
                  style={{
                    position: "absolute",
                    transform: "translate(-50%, -50%)",
                    right: "1%",
                    top: "2.8rem",
                    width: "9%",
                    fontSize: "8px",
                    lineHeight: "9px",
                  }}
                >
                  {" "}
                  Scan QR At Exhibits
                </span>
              </>
            ) : (
              <></>
            )}
            {badgeOpt ? (
              <Box
                mt={6}
                sx={{
                  display: "flex",
                  position: "absolute",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  padding: "1rem",
                }}
              >
                <InputLabel>Badges:</InputLabel>
                <Badge
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  color="secondary"
                  badgeContent={badgeWonCount}
                  max={999}
                >
                  <img src={Badge1}></img>
                </Badge>
                <Badge
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  color="secondary"
                  badgeContent={badgeLeftCount}
                  max={999}
                >
                  <img src={Badge2}></img>
                </Badge>
                <KeyboardArrowRightIcon />
              </Box>
            ) : (
              <></>
            )}
          </Toolbar>
        </AppBar>
      </Box>
      <div className={`sidebar ${isOpen == true ? "active" : ""}`}>
        <img src={logo} width={"100%"} />
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
          m={1}
        >
          <Avatar></Avatar>
          <InputLabel>{visitorDetails?.name}</InputLabel>
          <SettingsRoundedIcon />
        </Box>
        <Divider />
        <Typography mt={2} variant="h6" fontWeight={"bold"}>
          Welcome to UP@AI!
        </Typography>
        <img style={{ marginTop: "10%" }} src={menuEvent} width={"100%"} />
        <List sx={{ marginTop: "2%" }}>
          {listItem.map((ls, i) => (
            <ListItem
              key={i + 1}
              onClick={() => handleNavigation(ls.label)}
              secondaryAction={
                ls.showIcon ? (
                  <IconButton
                    aria-label="comment"
                  >
                    <ArrowForwardIosRoundedIcon fontSize="small" />
                  </IconButton>
                ) : (
                  <></>
                )
              }
            >
              <ListItemText sx={{ fontSize: "14px !important" }}>
                {ls.label}
              </ListItemText>
            </ListItem>
          ))}
        </List>
      </div>
      <div
        className={`sidebar-overlay ${isOpen == true ? "active" : ""}`}
        onClick={ToggleSidebar}
      ></div>
    </>
  );
}

export default ToolBar;
