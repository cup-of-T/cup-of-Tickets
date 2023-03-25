import { ITicket, IUser } from "../interfaces/interface";

export const getUsers = async () => {
  const response = await fetch("https://cup-of-tickets-backend.azurewebsites.net/api/Users")
  return await response.json() as IUser[];
}

export const postUser = async (user: IUser) => {
  const userToJson = JSON.stringify(user);
  const response = await fetch("https://cup-of-tickets-backend.azurewebsites.net/api/User", {
    method: 'POST',
    body: userToJson,
    headers: { 'Content-Type': 'application/json' },
  })
  return await response.json() as IUser;
}


export const getTickets = async () => {
  const response = await fetch("https://cup-of-tickets-backend.azurewebsites.net/api/Tickets")
  return await response.json() as ITicket[];
}

export const postTicket = async (ticket: ITicket) => {
  const ticketToJson = JSON.stringify(ticket);
  const response = await fetch("https://cup-of-tickets-backend.azurewebsites.net/api/Tickets", {
    method: 'POST',
    body: ticketToJson,
    headers: { 'Content-Type': 'application/json' },
  })
  return await response.json() as ITicket;
}

export const deleteTicket = async (ticketId: number) => {
  await fetch(`https://cup-of-tickets-backend.azurewebsites.net/api/Tickets/${ticketId}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  })
}

export const updateTicketStatus = async (ticketId: number, status: number) => {
  const statusToJson = JSON.stringify(status);
  const response = await fetch(`https://cup-of-tickets-backend.azurewebsites.net/api/Tickets/${ticketId}`, {
    method: 'PUT',
    body: statusToJson,
    headers: { 'Content-Type': 'application/json' },
  })
  return await response.json() as ITicket[];
}

export const updateTicketAssignedTo = async (ticketId: number, assignedTo: number) => {
  const assignedToInJson = JSON.stringify(assignedTo);
  const response = await fetch(`https://cup-of-tickets-backend.azurewebsites.net/api/Tickets/${ticketId}`, {
    method: 'PUT',
    body: assignedToInJson,
    headers: { 'Content-Type': 'application/json' },
  })
  return await response.json() as ITicket[];
}
