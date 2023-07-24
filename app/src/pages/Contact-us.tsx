import {
  Box,
  Link,
  Typography,
} from "@mui/material";
import { FC, ReactElement } from "react";
import ToolBar from "../layout/AppBar";

const ContactUS: FC<{}> = (): ReactElement => {

  return (
    <Box sx={{
        flexGrow: 1,
        backgroundColor: 'whitesmoke',
        display: 'flex',
        justifyContent: 'center',
        width: '100%'
    }}>
    <ToolBar hideBtn={false} show={false} badgeOpt={false} toolbarHeight={false}/>
      <Box mx={2} my={12} sx={{ width: "100%" }}>
      <Typography variant="h5" mt={4} sx={{ color: "primary.main", fontWeight:'bold' }}>
          Reach out to us at
        </Typography>
        <Typography variant="h6" mb={3} sx={{fontWeight:'bold'}}>
            <Link href="" sx={{textTransform: 'capitalize'}}>info@up-ai.in</Link>
        </Typography>
        <Box mx={5}>
            <Typography variant="h5" mt={4} sx={{ color: "primary.main", fontWeight:'bold' }}>
                Give your Feedback for event
            </Typography>
            <Link component={Typography} variant="body2" sx={{ textAlign: "center", color: '#1F3864', fontWeight:'bold' }}>Link</Link>
        </Box>
      </Box>
    </Box>
  );
};

export default ContactUS;
