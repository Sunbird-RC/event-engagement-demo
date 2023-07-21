import * as ION from "@decentralized-identity/ion-tools";
import { Box, Button, Card, CardContent, InputLabel, Typography } from "@mui/material";
import jwtDecode from "jwt-decode";
import { FC, useEffect, useState } from "react";
import { redirect, useParams } from "react-router-dom";
import { axiosInst } from "../api/axios";
import VerifiedIcon from "../assets/verified.svg";
import ToolBar from "../layout/AppBar";
import { apiRoutes, pageRoutes } from "../routes";
import { Presentation } from "../types/presentation";
import { useExhibitsData } from "../api/exhibit";
import { Exhibit } from "../types/exhibit";
import TabContents from "../layout/ExhibitsTable";

const VerifiedBadges: FC<{}> = () => {
  const [verificationPending, setVerificationPending] = useState(true);
  const [badgeCount, setBadgeCount] = useState(0);
  const [error, setError] = useState<Error | null>(null);
  const { presentationDid } = useParams();
  const [decodeData, setDecodeData] = useState([""]);

  useEffect(() => {
    if (!presentationDid) {
      return;
    }
    axiosInst
      .get(apiRoutes.verifyQrCode(presentationDid))
      .then((res) => res.data)
      .then(async (data) => {
        const verified = await ION.verify({
          jws: data.signed,
          publicJwk: data.publicKey,
        });
        if (verified) {
          const decodedData = jwtDecode<Presentation>(data.signed);
          console.log('decodedData ', decodedData);
          const badgeCount = decodedData?.verifiableCredential?.length || 0;
          setBadgeCount(badgeCount);
          let nameList: string[] = []
          decodedData?.verifiableCredential.forEach(cred => {
            nameList.push(cred.credentialSubject.work)
          })
          setDecodeData(nameList)
        }
      })
      .catch(() => {
        setError(new Error("Could not verify badges"));
      })
      .then(() => {
        setVerificationPending(false);
      });
  }, [presentationDid]);

  const { data } = useExhibitsData();
  let exhibitList: Exhibit[] = []
  if (data) {
    exhibitList = (data?.visited).concat(data?.unvisited)
  }
  const [showBadgeList, setShow] = useState(false);
  let exhibitArray: Exhibit[] = []
  const [exhibitContent, setContent] = useState(exhibitArray);
  
  function changeState(data: any) {
    let content: Exhibit[] = []
    exhibitList.forEach((exhibit: Exhibit) => {
      data.forEach((cred: string) => {
        if(exhibit.name == cred) {
          content.push(exhibit)
        }
      })
    })
    setShow(!showBadgeList);
    setContent(content)
    console.log('exhibitContent on state ', exhibitContent)
  }

  console.debug(presentationDid)

  if (!presentationDid) {
    redirect(pageRoutes.EXHIBITS_HOME);
    return null;
  }

  return (
    <Box
      sx={{
        flexGrow: 1,
        backgroundColor: "whitesmoke",
        display: "flex",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <ToolBar
        hideBtn={true}
        show={false}
        badgeOpt={false}
        toolbarHeight={false}
      />
      <Box
        sx={{
          my: !showBadgeList ? 20 : 14,
          mx: verificationPending ? 8 : 2,
          color: "primary.dark",
          width: "100%",
        }}
      >
        {!showBadgeList ? (
          verificationPending ? (
            "Loading"
          ) : (
            <>
              <Typography
                variant="h5"
                component="h5"
                fontWeight={"bold"}
                color={"#4DD8DD"}
              >
                {error
                  ? "Couldn't verify badge credentials"
                  : "Scanned Badge Credentials are valid & Verified"}
              </Typography>
              {!error && (
                <Box mt={8}>
                  <Card
                    sx={{
                      borderRadius: "30px",
                      boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.50)",
                    }}
                  >
                    <CardContent sx={{ paddingBottom: "10px !important" }}>
                      <img
                        src={VerifiedIcon}
                        style={{ margin: "-30px 0 -10px 0" }}
                      />
                      <InputLabel>{badgeCount}</InputLabel>
                      <InputLabel>Total Badges Earned</InputLabel>
                    </CardContent>
                  </Card>
                </Box>
              )}

              <Button sx={{marginTop:'30%', color:'#67C8D1', border:'1px solid #67C8D1'}} variant="outlined" onClick={() => changeState(decodeData)}>See all badges</Button>    
            </>
          )
        ):
        <TabContents content={exhibitContent} visited={true}></TabContents>}
      </Box>
    </Box>
  );
};

export default VerifiedBadges;
