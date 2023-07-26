import "./global.css";
import Head from "next/head";
import { Box } from "@CS-chakra";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Daily Codes",
  description: "Talk about anything i want and sometimes my poems",
};

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box minHeight="100%" pos={"relative"} pb={["80px", "80px", "100px"]}>
      <Nav />
      {children}
      <Footer />
    </Box>
  );
}
