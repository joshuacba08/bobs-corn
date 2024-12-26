import CartWidget from "@/components/CartWidget";
import { useNavigate } from "react-router-dom";

const CornNavBar = () => {
  const navigate = useNavigate();

  return (
    <header className="w-full shadow">
      <nav className="w-full max-w-[1200px] mx-auto flex justify-between items-center p-4">
        <h1
          onClick={() => {
            navigate("/");
          }}
          className="font-semibold text-lg cursor-pointer"
        >
          BOB'S CORN
        </h1>

        <CartWidget
          handleClick={() => {
            navigate("/dashboard");
          }}
        />
      </nav>
    </header>
  );
};

export default CornNavBar;
