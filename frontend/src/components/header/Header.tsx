import { useAuth0 } from "@auth0/auth0-react";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";
import './Header.css'

interface IHeaderProps {
<<<<<<< HEAD
}

const Header = ({ }: IHeaderProps) => {
=======
    setSelectedTeam: React.Dispatch<React.SetStateAction<number>>
}

const Header = ({ setSelectedTeam }: IHeaderProps) => {
>>>>>>> 027473ac3d1d23a4dd2f9678620edd51d00d76b7
    const { isAuthenticated, user } = useAuth0();
    return (
        <header className="header">
            <Sidebar />
<<<<<<< HEAD
            <Navbar />
=======
            <Navbar setSelectedTeam={setSelectedTeam} />
>>>>>>> 027473ac3d1d23a4dd2f9678620edd51d00d76b7
        </header>
    );
}

export default Header;
