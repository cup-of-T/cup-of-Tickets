import React from 'react'
import { Link } from 'react-router-dom'
import './sidebar.css'

export const Sidebar = () => {
  return (
    <aside className="sidebar">
      <menu className="sidebar__links">
        <Link to=""><i className=" sidebar__links-item fa-solid fa-house-chimney"></i></Link>
        <Link to=""><i className=" sidebar__links-item fa-solid fa-people-group"></i></Link>
        <Link to=""><i className=" sidebar__links-item fa-solid fa-gear"></i></Link>
      </menu>
    </aside>
  )
}
