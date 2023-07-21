import { Box } from "@mui/material";
import { useCallback } from "react";
import { useNavigate } from "react-router";
import QRScanner from "../QRScanner/QRScanner";
import { axiosInst } from "../api/axios";
import ToolBar from "../layout/AppBar";
import { apiRoutes, pageRoutes } from "../routes";
import { useKeycloak } from "@react-keycloak/web";
import { useLocation } from "react-router-dom";

const ScanQR: React.FC<{}> = () => {
  const { keycloak } = useKeycloak();
  const navigate = useNavigate();
  const { state } = useLocation();

  const visitExhibit = useCallback(async (qrId: string) => {
    return axiosInst.put(`${apiRoutes.EXHIBIT_QRSCAN}/${qrId}`, '', {headers: {Authorization: `Bearer ${keycloak.token}`}})
    .then(res => {
      console.log('visitExhibit ', res)
      if (res.status === 200) {
        state.visited = true;
        navigate(pageRoutes.EXHIBIT_DETAILS+'/'+state.data.osid, {state: state})
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
      <Box my={17}>
        <QRScanner
          onScan={(decodedText) => {
            console.log(decodedText);
            if (decodedText) {
              console.log("data on qr scan ", decodedText);
              if (/Exhibit+\-([1-9]\d?|100)/g.test(decodedText)) {
                visitExhibit(decodedText);
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
      </Box>
    </Box>
  );
};

export default ScanQR;
