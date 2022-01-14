import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { BarLoader } from "react-spinners";
import { AppBar } from "./components/AppBar";
import { Spinner } from "./components/Spinner";
import { CategoryPage } from "./pages/CategoryPage";
import { GuildAnalyticsPage } from "./pages/GuildAnalyticsPage";
import { GuildPrefixPage } from "./pages/GuildPrefixPage";
import { GuildBansPage } from "./pages/GuildBansPage";
import { HomePage } from "./pages/HomePage";
import { MenuPage } from "./pages/MenuPage";
import { WelcomeMessagePage } from "./pages/WelcomeMessagePage";
import { GuildContext } from "./utils/context/GuildContext";
import { useFetchUser } from "./utils/hooks/useFetchUser";
import { PartialGuild } from "./utils/types";

function App() {
  const [guild, setGuild] = useState<PartialGuild>();
  const { user, loading, error } = useFetchUser();

  const updateGuild = (guild: PartialGuild) => setGuild(guild);

  if (loading) return <Spinner children={<BarLoader color="white" />} />;

  return (
    <GuildContext.Provider value={{ guild, updateGuild }}>
      {user && !error ? (
        <>
          <Routes>
            <Route path="/dashboard/*" element={<AppBar />} />
          </Routes>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/menu" element={<MenuPage />} />
            {/* <Route path="/dashboard" element={<HomePage />} /> */}
            <Route path="/dashboard/categories" element={<CategoryPage />} />
            <Route path="/dashboard/prefix" element={<GuildPrefixPage />} />
            <Route path="/dashboard/message" element={<WelcomeMessagePage />} />
            <Route
              path="/dashboard/analytics"
              element={<GuildAnalyticsPage />}
            />
            <Route path="/dashboard/bans" element={<GuildBansPage />} />
          </Routes>
        </>
      ) : (
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<div>Not Found!</div>} />
        </Routes>
      )}
    </GuildContext.Provider>
  );
}

export default App;
