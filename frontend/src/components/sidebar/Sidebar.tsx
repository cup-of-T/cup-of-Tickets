import { Link } from 'react-router-dom'
import './sidebar.css'

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <menu className="sidebar__links">
        <Link className="sidebar__logo"to=""><img src="logoticket.png" className="logo" alt="logo" /></Link>
        <Link className="sidebar__links-item"to=""><i className="fa-solid fa-house-chimney"></i></Link>
        <Link className="sidebar__links-item"to=""><i className="fa-solid fa-people-group"></i></Link>
        <Link className="sidebar__links-item"to=""><i className="fa-solid fa-ticket"></i></Link>
        <Link className="sidebar__links-item" to="/kanban"><i className="fa-solid fa-list-ul"></i></Link>
        <Link className="sidebar__links-item"to=""><i className="fa-solid fa-gear"></i></Link>
      </menu >
    </aside >
  )
}

export default Sidebar;