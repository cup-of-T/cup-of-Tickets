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
        <Link className="sidebar__logo" to=""><img src="logoticket.png" className="logo" alt="logo" /></Link>
        <Link className="sidebar__links-item" to="/dashboard">
          <div className="sidebar__tooltip">
            <i className="fa-solid fa-table-list"></i>
            <span className="sidebar__tooltiptext">Dashboard</span>
          </div>
        </Link>
        <Link className="sidebar__links-item" to="/kanban">
          <div className="sidebar__tooltip">
            <i className="fa-solid fa-ticket"></i>
            <span className="sidebar__tooltiptext">My Tickets</span>
          </div>
        </Link>
        <Link className="sidebar__links-item" to="/teams">
          <div className="sidebar__tooltip">
            <i className="fa-solid fa-people-group"></i>
            <span className="sidebar__tooltiptext">Team</span>
          </div>
        </Link>


        <Link className="sidebar__links-item" to="/testing">
          <div className="sidebar__tooltip">
            <i className="fa-solid fa-flask"></i>
            <span className="sidebar__tooltiptext">To review</span>
          </div>
        </Link>
        {(dbUser.role == "Manager" || dbUser.role == "Admin") && (
          <Link className="sidebar__links-item" to="/inprogress">
            <div className="sidebar__tooltip">
              <i className="fa-solid fa-person-digging"></i>
              <span className="sidebar__tooltiptext">In progress</span>
            </div>
          </Link>
        )}

        <Link className="sidebar__links-item" to="/archive">
        <div className="sidebar__tooltip">
            <i className="fa-solid fa-box-archive"></i>
            <span className="sidebar__tooltiptext">Archive</span>
          </div>
        </Link>

        <Link className="sidebar__links-item" to="/settings">
        <div className="sidebar__tooltip">
            <i className="fa-solid fa-gear"></i>
            <span className="sidebar__tooltiptext">Settings</span>
          </div>
        </Link>
      </menu >
    </aside >
  )
}

export default Sidebar;