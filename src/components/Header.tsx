import { CiHeart } from "react-icons/ci";
import { FaFacebookMessenger } from "react-icons/fa";

const Header: React.FC = () => {
  return (
    <div className="flex justify-between">
      <div>
        <img
          src="https://jennpirri.wordpress.com/wp-content/uploads/2013/05/instagram-logo.png"
          alt="Instagram"
          width={131}
        />
      </div>
      <div className="flex gap-2 justify-end items-center">
        <div>
          <CiHeart size={22} />
        </div>
        <div>
          <FaFacebookMessenger size={20} />
        </div>
      </div>
    </div>
  );
};

export default Header;
