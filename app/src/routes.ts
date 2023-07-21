import CredentialVerification from "./pages/CredentialVerify";
import ExhibitCardDetails from "./pages/ExhibitDetails";
import ExhibitResult from "./pages/ExhibitResult";
import ExhibitsHome from "./pages/ExhibitsHome";
import HomePage from "./pages/Home";
import LeaderBoard from "./pages/Leaderboard";
import FirstLogin from "./pages/Login";
import Register from "./pages/Register";
import ScanQR from "./pages/ScanQR";
import VerifiedBadges from "./pages/VerifiedBadges";

export const pageRoutes = {
  REGISTER: "/Register",
  LOGIN: "/FirstLogin",
  USER_HOME: "/UserHome",
  QUESTION_SET: "/QuestionSet",
  EXHIBIT_DETAILS: "/ExhibitCardDetails",
  EXHIBITS_HOME: "/ExhibitsHome",
  EXHIBIT_RESULT: "/ExhibitResult",
  LEADER_BOARD: "/LeaderBoard",
  VERIFIED_BADGES: "/Verification",
  SCAN_QR: "/scan-qr",
  CREDENTIAL_VERIFY: "/CredentialVerification",
};

export const apiRoutes = {
  VISIT_EXHIBIT: "/visit",

  QUIZ: "/quiz", // "/api/v1/Quiz/getQuestions/{exhibitionId}"
  QUIZ_SUBMIT: "/api/v1/Quiz/submit",

  BADGE: "/api/v1/Visitor/Quiz/list", //"/badge",
  VISITOR_DETAILS: "/api/v1/Visitor/details", //'/visitorDet'
  VISITOR_REG: "/api/v1/Visitor",
  EXHIBIT_QRSCAN: "/api/v1/Visitor/visit",

  EXHIBITS: "/api/v1/Exhibit", // "/exhibits",
  EXHIBITS_DET: "/api/v1/Exhibit", // '/exhibitsDet'

  QR_CODE: "/api/v1/QRCode",
  verifyQrCode: (presentationDid: string) =>
    `/api/v1/QRCode/${presentationDid}/verify`,
};

interface Route {
  key: string;
  title: string;
  path: string;
  enabled: boolean;
  component: React.FC<{}>;
}

export const routes: Route[] = [
  {
    key: "home-route",
    title: "HomePage",
    path: "/",
    enabled: true,
    component: HomePage,
  },
  {
    key: "register-route",
    title: "Register",
    path: "/Register",
    enabled: true,
    component: Register,
  },
  {
    key: "firstLogin-route",
    title: "FirstLogin",
    path: "/FirstLogin",
    enabled: true,
    component: FirstLogin,
  },
  {
    key: "exhibitCardDetails-route",
    title: "ExhibitCardDetails",
    path: "/ExhibitCardDetails/:exhibitId",
    enabled: true,
    component: ExhibitCardDetails,
  },
  {
    key: "exhibitsHome-route",
    title: "ExhibitsHome",
    path: "/ExhibitsHome",
    enabled: true,
    component: ExhibitsHome,
  },
  {
    key: "ExhibitResult-route",
    title: "ExhibitResult",
    path: "/ExhibitResult",
    enabled: true,
    component: ExhibitResult,
  },
  {
    key: "leaderBoard-route",
    title: "LeaderBoard",
    path: "/LeaderBoard",
    enabled: true,
    component: LeaderBoard,
  },
  {
    key: "verifiedBadges-route",
    title: "VerifiedBadges",
    path: "/Verification/:presentationDid",
    enabled: true,
    component: VerifiedBadges,
  },
  {
    key: "ScanQR-route",
    title: "ScanQR",
    path: "/scan-qr",
    enabled: true,
    component: ScanQR,
  },
  {
    key: "credentialVerification-route",
    title: "CredentialVerification",
    path: "/CredentialVerification",
    enabled: true,
    component: CredentialVerification,
  },
];
