import { Link } from 'react-router-dom'
import './sidebar.css'

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <menu className="sidebar__links">
        <Link className="sidebar__logo"to=""><img src="logoticket.png" className="logo" alt="logo" /></Link>
        <Link className="sidebar__links-item" to="/dashboard"><i className="fa-solid fa-table-list"></i></Link>
        <Link className="sidebar__links-item"to="/kanban"><i className="fa-solid fa-ticket"></i></Link>
        <Link className="sidebar__links-item"to="/teams"><i className="fa-solid fa-people-group"></i></Link>
        <Link className="sidebar__links-item"to=""><i className="fa-solid fa-gear"></i></Link>
        <Link className="sidebar__links-item"to="/archive"><i className="fa-solid fa-box-archive"></i></Link>
      </menu >
    </aside >
  )
}

export default Sidebar;