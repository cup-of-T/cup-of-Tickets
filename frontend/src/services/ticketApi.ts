import { ITicket, IUser } from "../interfaces/interface";

export const getUsers = async (accessToken: string) => {
  const response = await fetch(`${import.meta.env.VITE_API_SERVER_URL}/Users`,{
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
  return await response.json() as IUser[];
}

export const postUser = async (user: IUser) => {
  const userToJson = JSON.stringify(user);
  const response = await fetch(`${import.meta.env.VITE_API_SERVER_URL}/User`, {
    method: 'POST',
    body: userToJson,
    headers: { 'Content-Type': 'application/json' },
  })
  return await response.json() as IUser;
}


export const getTickets = async () => {
  const response = await fetch(`${import.meta.env.VITE_API_SERVER_URL}/Tickets`)
  return await response.json() as ITicket[];
}

export const postTicket = async (ticket: ITicket) => {
  const ticketToJson = JSON.stringify(ticket);
  const response = await fetch(`${import.meta.env.VITE_API_SERVER_URL}/Tickets`, {
    method: 'POST',
    body: ticketToJson,
    headers: { 'Content-Type': 'application/json' },
  })
  return await response.json() as ITicket;
}

export const deleteTicket = async (ticketId: number) => {
  await fetch(`${import.meta.env.VITE_API_SERVER_URL}/Tickets/${ticketId}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  })
}

export const updateTicketStatus = async (ticketId: number, status: number) => {
  const statusToJson = JSON.stringify(status);
  const response = await fetch(`${import.meta.env.VITE_API_SERVER_URL}/Tickets/${ticketId}/status`, {
    method: 'PATCH',
    body: statusToJson,
    headers: { 'Content-Type': 'application/json' },
  })
  return await response.json() as ITicket[];
}

export const updateTicketAssignedTo = async (ticketId: number, assigneeId: number) => {
  const assigneeIdToJson = JSON.stringify(assigneeId);
  const response = await fetch(`${import.meta.env.VITE_API_SERVER_URL}/Tickets/${ticketId}(assignedto)`, {
    method: 'PATCH',
    body: assigneeIdToJson,
    headers: { 'Content-Type': 'application/json' },
  })
  return await response.json() as ITicket[];
}
