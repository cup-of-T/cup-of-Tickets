import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../../context/UserProvider'
import { UserContextType } from '../../types'
import Loader from '../loader/Loader'
import './sidebar.css'

const Sidebar = () => {
  const { dbUser } = useContext(UserContext) as UserContextType;

  if (dbUser == null) return (< Loader />);

  return (
    <aside className="sidebar">
      <menu className="sidebar__links">
        <Link className= "sidebar__logo" to=""><img src="logoticket.png" className="logo" alt="logo" /></Link>
        <Link className="sidebar__links-item" to="/dashboard">
            <i className="fa-solid fa-table-list"></i>
            <span className="sidebar__tooltiptext">Dashboard</span>
        </Link>
        <Link className="sidebar__links-item" to="/kanban">
            <i className="fa-solid fa-ticket"></i>
            <span className="sidebar__tooltiptext">My Tickets</span>
        </Link>
        <Link className="sidebar__links-item" to="/teams">
            <i className="fa-solid fa-people-group"></i>
            <span className="sidebar__tooltiptext">Team</span>
        </Link>


        <Link className="sidebar__links-item" to="/testing">
            <i className="fa-solid fa-flask"></i>
            <span className="sidebar__tooltiptext">To review</span>
        </Link>
        {(dbUser.role == "Manager" || dbUser.role == "Admin") && (
          <Link className="sidebar__links-item" to="/inprogress">

              <i className="fa-solid fa-person-digging"></i>
              <span className="sidebar__tooltiptext">In progress</span>
          </Link>
        )}

        <Link className="sidebar__links-item" to="/archive">
            <i className="fa-solid fa-box-archive"></i>
            <span className="sidebar__tooltiptext">Archive</span>
        </Link>

        <Link className="sidebar__links-item" to="/settings">
            <i className="fa-solid fa-gear"></i>
            <span className="sidebar__tooltiptext">Settings</span>
        </Link>
      </menu >
    </aside >
  )
}

export default Sidebar;