import CircularProgress from "@mui/material/CircularProgress";
import { Backdrop } from "@mui/material";

interface LoaderProps {
    loading: boolean;
}

export default function LoadingController(props: LoaderProps) {

  const { loading } = props;

  return (
    <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}>
        <CircularProgress color="inherit" />
    </Backdrop>
  );
}
