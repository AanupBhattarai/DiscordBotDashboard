import { AppBarImgStyle, AppBarStyle } from "../utils/styles";
import { useContext } from "react";
import { GuildContext } from "../utils/context/GuildContext";
import { Navigate, useNavigate } from "react-router-dom";
import { getIconURL } from "../utils/helpers";

export const AppBar = () => {
  const navigate = useNavigate();
  const { guild } = useContext(GuildContext);
  return guild ? (
    <AppBarStyle>
      <h1 style={{ fontWeight: "normal", fontSize: "20px" }}>
        Configuring {guild.name}
      </h1>
      <AppBarImgStyle
        src={getIconURL(guild)}
        onClick={() => navigate("/dashboard/categories")}
        height={55}
        width={55}
        style={{ borderRadius: "50%" }}
        alt="logo"
      />
    </AppBarStyle>
  ) : (
    <Navigate replace to="/menu" />
  );
};
