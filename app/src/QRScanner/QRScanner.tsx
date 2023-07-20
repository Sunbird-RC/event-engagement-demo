import { Box } from "@mui/material";
import { Html5Qrcode } from "html5-qrcode";
import { useEffect } from "react";

const scannerDivId = "qr-scanner-div";

interface QRScannerProps {
  onScan: (decodedText: string) => void;
  onError?: (errorMsg: string) => void;
}
/**
 * Renders a video of camera stream and scans for QR codes.
 *
 * @author Anirudh Kulkarni <anirudh.k@beehyv.com>
 */
const QRScanner: React.FC<QRScannerProps> = ({ onScan, onError }) => {
  useEffect(() => {
    const html5Qrcode = new Html5Qrcode(scannerDivId);
    const config: MediaTrackConstraints = {
      facingMode: "environment",
    };

    const aspectRatio = window.innerHeight / window.innerWidth;

    const scannerStartPromise = html5Qrcode
      .start(
        config,
        {
          fps: 10,
          qrbox: (viewFinderWidth, viewFinderHeight) => {
            const side = Math.min(viewFinderHeight, viewFinderWidth);
            const final = {
              width: Math.max(Math.floor(0.75 * side), 50),
              height: Math.max(Math.floor(0.75 * side), 100),
            };
            return final;
          },
          aspectRatio: aspectRatio,
        },
        (decodedText) => {
          onScan(decodedText);
          html5Qrcode.stop();
        },
        (errorMessage) => {
          onError?.(errorMessage);
        },
      )
      .catch((err) => {
        onError?.(err.message);
      });
    return () => {
      scannerStartPromise.then(() => html5Qrcode.stop());
    };
  }, []);

  return <Box id={scannerDivId} width={"100%"} />;
};

export default QRScanner;
