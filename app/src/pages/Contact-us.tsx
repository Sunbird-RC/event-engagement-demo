import {
  Box,
  Link,
  Typography,
} from "@mui/material";
import { FC, ReactElement } from "react";
import ToolBar from "../layout/AppBar";

const ContactUS: FC<{}> = (): ReactElement => {

  const handleFeedbackform = (type: string) => {
    let url: string = '';
    switch(type) {
      case 'feedback': 
      url = 'https://forms.gle/vmCX38h1uXWDnzQV9';
      break;
      case 'vsk': 
      url = 'https://forms.gle/JWiAC38iA1sfhLwR8';
      break;
      case 'ulp': 
      url = 'https://forms.gle/6PwQD9qfRqEVDptS7';
      break;
    }
    window.open(url)
  }
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
        <Typography variant="h6" mb={3} sx={{fontWeight:'bold'}}>info@up-ai.in
        </Typography>
        <Box mx={5}>
            <Typography variant="h5" mt={4} sx={{ color: "primary.main", fontWeight:'bold' }}>
              Event Feedback form link:
            </Typography>
            <Link component={Typography} variant="body2" sx={{ textAlign: "center", color: '#1F3864', fontWeight:'bold' }} onClick={() => handleFeedbackform('feedback')}>Link</Link>
        </Box>
        <Box mx={5}>
            <Typography variant="h5" mt={4} sx={{ color: "primary.main", fontWeight:'bold' }}>
              VSK Experience Center Feedback:
            </Typography>
            <Link component={Typography} variant="body2" sx={{ textAlign: "center", color: '#1F3864', fontWeight:'bold' }} onClick={() => handleFeedbackform('vsk')}>Link</Link>
        </Box>
        <Box mx={5}>
            <Typography variant="h5" mt={4} sx={{ color: "primary.main", fontWeight:'bold' }}>
              ULP Experience Center Feedback:
            </Typography>
            <Link component={Typography} variant="body2" sx={{ textAlign: "center", color: '#1F3864', fontWeight:'bold' }} onClick={() => handleFeedbackform('ulp')}>Link</Link>
        </Box>
      </Box>
    </Box>
  );
};

export default ContactUS;
