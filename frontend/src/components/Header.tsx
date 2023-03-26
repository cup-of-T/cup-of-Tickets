import './Header.css'
import Sidebar from "./sidebar/Sidebar";
import Navbar from "./navbar/Navbar";

interface IHeaderProps {
}

const Header = ({ }: IHeaderProps) => (
    <header>
        <Navbar />
        <Sidebar />
    </header>
);


export default Header;
