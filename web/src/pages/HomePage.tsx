import { FaDiscord, FaQuestionCircle } from "react-icons/fa";
import { FooterButton, HomePageStyle, MainButton } from "../utils/styles";

export const HomePage = () => {
  const redirect = () => {
    window.location.href = "http://localhost:3001/api/auth/login";
  };

  return (
    <HomePageStyle>
      <div></div>
      <div>
        <MainButton onClick={redirect}>
          <FaDiscord size={45} color="5865F2" />
          <p style={{ fontSize: "20px" }}>Login With Discord</p>
        </MainButton>
        <MainButton>
          <FaQuestionCircle size={45} />
          <p style={{ fontSize: "20px" }}>Support Server</p>
        </MainButton>
      </div>
      <div
        style={{
          display: "flex",
          width: "450px",
          justifyContent: "space-between",
        }}
      >
        <FooterButton>Privacy Policy</FooterButton>
        <FooterButton>Terms of Services</FooterButton>
        <FooterButton>Contact Us</FooterButton>
      </div>
    </HomePageStyle>
  );
};
