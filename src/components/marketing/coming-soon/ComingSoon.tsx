import React from "react";
import HeroSection from "./Hero";
import LegacySection from "./Legacy";
import CollectionPreview from "./CollectionPreview";
import SocialConnect from "./SocialConnect";
import FooterComingSoon from "./Footer";
import Navbar from "./ComingSoonNavbar";

const ComingSoonPage = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <LegacySection />
      <CollectionPreview />
      <SocialConnect />
      <FooterComingSoon />
    </>
  );
};

export default ComingSoonPage;
