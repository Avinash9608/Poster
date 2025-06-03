import HomeNavbar from "./HomeNavbar";
import Footer from "./Footer";

const HomeLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen w-full overflow-x-hidden">
      <HomeNavbar />
      <main className="flex-grow w-full">{children}</main>
      {/* <Footer /> */}
    </div>
  );
};

export default HomeLayout;
