import React from 'react'
import { Link } from 'react-router-dom'
import './sidebar.css'

export const Sidebar = () => {
  return (
    <aside className="sidebar">
      <menu className="sidebar__links">
        <Link className="sidebar__links-item"to=""><i className="fa-solid fa-house-chimney"></i></Link>
        <Link className="sidebar__links-item"to=""><i className="fa-solid fa-people-group"></i></Link>
        <Link className="sidebar__links-item"to=""><i className="fa-solid fa-gear"></i></Link>
      </menu>
    </aside>
  )
}
