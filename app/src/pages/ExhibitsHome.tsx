import { Box, Tab, Tabs, Typography } from "@mui/material";
import { FC, ReactElement, useMemo, useState } from "react";
import { useExhibitsData } from "../api/exhibit";
import ToolBar from "../layout/AppBar";
import TabContents from "../layout/ExhibitsTable";
import ExhibitCenter from '../assets/ExhibitCenter.svg';
import Agenda from '../assets/Agenda.jpeg';
import emptyList from '../assets/emptyList.svg'
import { useNavigate } from "react-router-dom";
import { pageRoutes } from "../routes";
import { useKeycloak } from "@react-keycloak/web";


interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const ExhibitsHome: FC<any> = (): ReactElement => {
  const navigate = useNavigate();
  const { keycloak, initialized } = useKeycloak();
  if (initialized && !keycloak.authenticated) {
    navigate(pageRoutes.REGISTER)
  }
  const [tabIndex, setTabIndex] = useState(0);
  const { data, isLoading } = useExhibitsData();

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  const { visitedList, notVisitedList } = useMemo(() => {
    if (!data) return { visitedList: [], notVisitedList: [] };
    return { visitedList: data.visited, notVisitedList: data.unvisited };
  }, [data]);

  function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  return (
    <Box
      sx={{
        flexGrow: 1,
        backgroundColor: "whitesmoke",
        display: "flex",
        justifyContent: "center",
        width: "100%"
      }}
    >
      <ToolBar
        show={true}
        badgeOpt={true}
        toolbarHeight={true}
        hideBtn={false}
      />
      <Box sx={{ my: 20, mx: 2, width: "100%" }}>
        <Box sx={{ bgcolor: 'transparent'}}>
          <Tabs value={tabIndex} onChange={handleTabChange} variant="scrollable" scrollButtons allowScrollButtonsMobile>
            <Tab label="Schedule" {...a11yProps(0)} />
            <Tab label="All Exhibits" {...a11yProps(1)} />
            <Tab label="Exhibits visited" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={tabIndex} index={0}>
          <Box mt={4}>
            <img src={Agenda} width={'100%'} height={'100%'}/>
          </Box>
        </CustomTabPanel>
        <CustomTabPanel value={tabIndex} index={2}>
          {isLoading ? (
            // "Loading ..."
            <img src={ExhibitCenter} style={{marginTop: '10%'}}/>
          ) : (
            visitedList.length > 0 ? (
              <TabContents content={visitedList} visited={true}></TabContents>
            ) : (
              <Box my={6}>
              <img src={emptyList}/>
              <Typography variant="h5" mt={2}
                component="h5"
                fontWeight={"bold"}
                color={"#4DD8DD"}>Please visit the Experience Center</Typography>
              </Box>
            )
          )}
        </CustomTabPanel>
        <CustomTabPanel value={tabIndex} index={1}>
          {isLoading ? (
            "Loading ..."
          ) : (
            <TabContents content={notVisitedList} visited={false}></TabContents>
          )}
        </CustomTabPanel>
      </Box>
    </Box>
  );
};

export default ExhibitsHome;
