import Navbar from "./MainNavbar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen w-full overflow-x-hidden">
      <Navbar />
      <main className="flex-grow w-full">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
