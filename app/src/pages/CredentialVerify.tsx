
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
            <ToolBar hideBtn={false} show={false} badgeOpt={false} toolbarHeight={false}/>
            <Box sx={{ my: 10, width: '100%'}}>
                {!qrcode ? (
                <>
                    <Box mx={4} mt={8} border={'2px solid black'}>
                        <img src={`${qrcode}`} width={'100%'} style={{display:'flex', alignItems:'center'}}/>
                    </Box>
                    <Typography mt={4} mx={2} variant="h5" component="h5" fontWeight={'bold'} color={'#4DD8DD'}>Verify your credentials To earn rewards. </Typography>
                </>
                ): 
                <Typography mt={10} mx={3} variant="h5" textAlign={'center'} fontWeight={'bold'} color={'#4DD8DD'}>Please visit experience center to receive your credentials</Typography>}
            </Box>
        </Box>
    );
};

export default CredentialVerification;