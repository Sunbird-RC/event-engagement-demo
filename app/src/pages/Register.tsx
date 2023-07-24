import ApartmentOutlinedIcon from "@mui/icons-material/ApartmentOutlined";
import ContactEmergencyOutlinedIcon from "@mui/icons-material/ContactEmergencyOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import {
  Box,
  Button,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { useKeycloak } from "@react-keycloak/web";
import { FC, ReactElement } from "react";
import { useForm } from "react-hook-form";
import AnubhavLogo from "../assets/anubhavLogo.svg";
import footer from "../assets/footer.svg";
import { useVistorRegister } from "../api/visitors";

const Register: FC<{}> = (): ReactElement => {
  const { keycloak } = useKeycloak();
  const { register, handleSubmit } = useForm();
  const { mutate: registerVisitor } = useVistorRegister();
  const onSubmit = (data: any) => {
    console.log('phone ' , data, data.name, data.phone.match(/^\d{10}$/), data.organization);
    if (!(data.phone).match(/^\d{10}$/)) {
      console.log('not match')
    }
    if (data.name && data.phone.match(/^\d{10}$/) && data.organisation) {
      let registerJson = {
        name: data.name,
        mobileNumber: data.phone,
        organization: data.organisation || "",
        email: data.email || ""
      }
      registerVisitor(registerJson, {
        onSuccess: (res: any) => {
          console.log('res ', res);
          keycloak.login({
            redirectUri: `${window.location.origin}/ExhibitsHome`,
          });
        },
        onError: () => {
          console.log('error')
        }
      });
    } else {
      console.log('else failed')
    }
  };
  return (
    <Box
      sx={{
        flexGrow: 1,
        background:
          "linear-gradient(to top, #67C8D1 25%, #FFF 110%) !important",
        display: "flex",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <Box mx={2} sx={{ width: "100%" }}>
        <img src={AnubhavLogo} />
        <Typography my={6} mx={3}
          gutterBottom
          variant="subtitle1"
          component="div"
          color={"#1F3665"}
          fontWeight={"bold"}
        >
          Hey Guest, please enter the details below would be great if you could register with us before the experience
        </Typography>
        <Box
          width={"100%"}
          color={"black"}
          mt={4}
          mb={4}
          component="form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="inputFields">
            <TextField
              required
              id="name"
              label=""
              placeholder="Enter you name"
              {...register("name")}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <ContactEmergencyOutlinedIcon />
                  </InputAdornment>
                ),
              }}
              variant="outlined"
              sx={{ width: "90%", background: "white", borderRadius: "10px" }}
            />
          </div>
          <div className="inputFields">
            <TextField
              required
              id="phone"
              type="number"
              label=""
              placeholder="Enter you phone number"
              {...register("phone")}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocalPhoneOutlinedIcon />
                  </InputAdornment>
                ),
              }}
              variant="outlined"
              sx={{ width: "90%", background: "white", borderRadius: "10px" }}
            />
          </div>
          <div className="inputFields">
            <TextField
              required
              id="organisation"
              label=""
              placeholder="Enter you organisation name"
              {...register("organisation")}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <ApartmentOutlinedIcon />
                  </InputAdornment>
                ),
              }}
              variant="outlined"
              sx={{ width: "90%", background: "white", borderRadius: "10px" }}
            />
          </div>
          <div className="inputFields">
            <TextField
              id="email"
              type="email"
              label=""
              placeholder="Enter you email"
              {...register("email")}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MailOutlineIcon />
                  </InputAdornment>
                ),
              }}
              variant="outlined"
              sx={{ width: "90%", background: "white", borderRadius: "10px" }}
            />
          </div>
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 6, mb: 2, width: "50%", backgroundColor: "white" }}
          >
            Register
          </Button>
          <Box mx={10} mb={2}>
            <Link
              component={Typography}
              onClick={() => {
                keycloak.login({
                  redirectUri: `${window.location.origin}/ExhibitsHome`,
                });
              }}
              variant="body2"
              sx={{ textAlign: "center", color: "#1F3964 !important" }}
            >
              Already registered? Go to Login
            </Link>
          </Box>
        </Box>
        <img src={footer} style={{ position: "relative" }} />
      </Box>
    </Box>
  );
};

export default Register;
