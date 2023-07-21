import { Box } from "@mui/material";
import { useCallback } from "react";
import { useNavigate } from "react-router";
import QRScanner from "../QRScanner/QRScanner";
import { axiosInst } from "../api/axios";
import ToolBar from "../layout/AppBar";
import { apiRoutes } from "../routes";

const ScanQR: React.FC<{}> = () => {
  const navigate = useNavigate();
  const visitExhibit = useCallback(async (qrId: string) => {
    return axiosInst.put(`${apiRoutes.EXHIBIT_QRSCAN}/${qrId}`);
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
                const url = new URL(decodedText);
                navigate(url.pathname);
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
