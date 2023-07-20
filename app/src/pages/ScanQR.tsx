import { Box } from "@mui/material";
import { useNavigate } from "react-router";
import QRScanner from "../QRScanner/QRScanner";
import ToolBar from "../layout/AppBar";
import { useExhibitsQrcode } from "../api/exhibit";
import { pageRoutes } from "../routes";

const ScanQR: React.FC<{}> = () => {
  const navigate = useNavigate();
  // const [text, setData] = useState('');
  // useEffect(() => {
  //   console.log('res', text);
  //   const { data } = useExhibitsQrcode(text);
  //   console.log('after scan ', data)
  //   if (data.message == 'SUCCESSFUL') {
  //     navigate(pageRoutes.EXHIBITS_HOME)
  //   } else {
  //     console.log('error')
  //   }
  // })
  // function scanQrCode(decodeText: string) {
  //   console.log('before scan ', decodeText)
  //   setDecodeText(useExhibitsQrcode(decodeText))
  //   console.log('after scan ', data)
  //   if (data.message == 'SUCCESSFUL') {
  //     navigate(pageRoutes.EXHIBITS_HOME)
  //   } else {
  //     console.log('error')
  //   }
  // }
  // const { data } = useExhibitsQrcode(decodeText);

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
              console.log('data on qr scan ', decodedText);
              if(/\Exhibit+\-([1-9]\d?|100)/g.test(decodedText)) {
                const { data } = useExhibitsQrcode(decodedText);
              } else if(/\https+\:\/\//g.test(decodedText) && decodedText.includes('did:upai:badge:presentation')) {
                navigate(pageRoutes.VERIFIED_BADGES)
              } else {
                console.log(`Qr code doesn't match`)
              }
            } 
          }}
        />
      </Box>
    </Box>
  );
};

export default ScanQR;
