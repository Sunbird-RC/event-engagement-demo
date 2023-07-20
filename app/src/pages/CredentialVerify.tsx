
import {ReactElement, FC} from "react";
import { Box, Typography} from "@mui/material";
import ToolBar from "../layout/AppBar";
import { useQrCode } from "../api/badge";

const CredentialVerification: FC<any> = (): ReactElement => {
    const {data} = useQrCode()
    let qrcode = data;
    return (
        <Box sx={{
            flexGrow: 1,
            backgroundColor: 'whitesmoke',
            display: 'flex',
            justifyContent: 'center',
            width: '100%'
        }}>
            <ToolBar hideBtn={true} show={false} badgeOpt={false} toolbarHeight={false}/>
            <Box sx={{ my: 10, width: '100%'}}>
                <Box mx={4} mt={8} border={'2px solid black'}>
                    <img src={`${qrcode}`} width={'100%'} style={{display:'flex', alignItems:'center'}}/>
                </Box>
                <Typography mt={4} mx={2} variant="h5" component="h5" fontWeight={'bold'} color={'#4DD8DD'}>Verify your credentials To earn rewards. </Typography>
            </Box>
        </Box>
    );
};

export default CredentialVerification;