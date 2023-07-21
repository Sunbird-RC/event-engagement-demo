import { Box, Button, Typography } from "@mui/material";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router";
import QRScanner from "../QRScanner/QRScanner";
import { axiosInst } from "../api/axios";
import ToolBar from "../layout/AppBar";
import { apiRoutes, pageRoutes } from "../routes";
import { useKeycloak } from "@react-keycloak/web";
import { useLocation } from "react-router-dom";
import { useExhibitsData } from "../api/exhibit";
import { Exhibit } from "../types/exhibit";

const ScanQR: React.FC<{}> = () => {
  const { keycloak } = useKeycloak();
  const navigate = useNavigate();
  const { state } = useLocation();
  let contentState = state;
  const [errMsg, setError] = useState(false);

  const { data } = useExhibitsData();
  let exhibitlist: any[] = []
  if (data) {
    exhibitlist = (data?.visited).concat(data?.unvisited)
  }

  const scanAgain = (data: any) => {
    setError(false)
    contentState = data
  }
  const visitExhibit = useCallback(async (qrId: string) => {
    let navParams = {}
    let osid = ""
    return axiosInst.put(`${apiRoutes.EXHIBIT_QRSCAN}/${qrId}`, '', {headers: {Authorization: `Bearer ${keycloak.token}`}})
    .then(res => {
      console.log('visitExhibit ', res)
      if (res.status === 200) {
        if (contentState) {
          contentState.visited = true;
          navParams = contentState;
          osid = contentState.data.osid
        } else {
          let content = {};
          exhibitlist.forEach((ls: Exhibit) => {
            console.log('qrcode ', ls, qrId)
            if(ls.qrId == qrId) {
              content = ls
              osid = ls.osid
              navParams = {data: content, visited: true}
            }
          })
        }
        navigate(pageRoutes.EXHIBIT_DETAILS+'/'+osid, {state: navParams})
      } else {
        console.log(res.data.message);
      }
    });
  }, []);


  return (
    <Box>
      <ToolBar
        hideBtn={false}
        show={false}
        badgeOpt={false}
        toolbarHeight={true}
      />
      {errMsg ? (
      <Box sx={{position: 'absolute', top:'40%', left:'25%'}}>
        <Typography variant="h6" color={'red'}>Wrong Exhibit Qrcode</Typography>
        <Button sx={{marginTop:'10%', color:'#67C8D1', border:'1px solid #67C8D1'}} variant="outlined" onClick={() => scanAgain(contentState)}>Scan Again</Button>    
      </Box>
      ) :
      (<Box my={17}>
        <QRScanner
          onScan={(decodedText) => {
            console.log(decodedText);
            if (decodedText) {
              if (/Exhibit+\-([1-9]\d?|100)/g.test(decodedText)) {
                if (contentState) {
                  if (contentState.data.qrId === decodedText) {
                    visitExhibit(decodedText);
                  } else {
                    setError(true)
                  }
                } else {
                  visitExhibit(decodedText);
                }
              } else if (
                /https+\:\/\//g.test(decodedText) &&
                decodedText.includes("did:upai:badge:presentation")
              ) {
                let did = decodedText.substring(decodedText.lastIndexOf('/')+1);
                console.log('decode text ', did)
                navigate(pageRoutes.VERIFIED_BADGES+'/'+did);
              } else {
                console.log(`Qr code doesn't match`);
              }
            }
          }}
        />
      </Box>)}
    </Box>
  );
};

export default ScanQR;
