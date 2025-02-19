'use client'
import Header from "./components/Header";
import MainContact from "./components/MainContact";
import MainContent from "./components/MainContent";


export default function Home() {
  return (
    <div className="w-full h-screen flex">
      <Header />
      <MainContact />
      <MainContent />
    </div>
  );
}
