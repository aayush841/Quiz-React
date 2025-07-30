import logo from '../assets/logo.png';


const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-blue-500 via-cyan-400 to-pink-500 shadow-md p-4">
      <div className="flex justify-center items-center">
        <img src={logo} alt="Company Logo" className="w-10 h-10 rounded-full mr-3" />
        <span className="text-white text-2xl font-bold">Casual Funnel</span>
      </div>
    </nav>
  );
};


export default Navbar;
