import { ITicket } from "../interfaces/interface";

export const getTickets = async (accesToken: string) => {
  const response = await fetch(`${import.meta.env.VITE_API_SERVER_URL}/Tickets`, {
    headers: { Authorization: `Bearer ${accesToken}` }
  })
  return await response.json() as ITicket[];
}

export const postTicket = async (ticket: ITicket, accesToken: string) => {
  const ticketToJson = JSON.stringify(ticket);
  const response = await fetch(`${import.meta.env.VITE_API_SERVER_URL}/Tickets`, {
    method: 'POST',
    body: ticketToJson,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accesToken}`
    },
  })
  return await response.json() as ITicket;
}

export const deleteTicket = async (ticketId: number, accesToken: string) => {
  await fetch(`${import.meta.env.VITE_API_SERVER_URL}/Tickets/${ticketId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accesToken}`
    },
  })
}

export const updateTicketStatus = async (ticketId: number, status: number, accesToken: string) => {
  const statusToJson = JSON.stringify(status);
  const response = await fetch(`${import.meta.env.VITE_API_SERVER_URL}/Tickets/${ticketId}/status`, {
    method: 'PATCH',
    body: statusToJson,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accesToken}`
    },
  })
  return await response.json() as ITicket[];
}

export const updateTicketAssignedTo = async (ticketId: number, assigneeId: number, accesToken: string) => {
  const assigneeIdToJson = JSON.stringify(assigneeId);
  const response = await fetch(`${import.meta.env.VITE_API_SERVER_URL}/Tickets/${ticketId}/assignedto`, {
    method: 'PATCH',
    body: assigneeIdToJson,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accesToken}`
    },
  })
  return await response.json() as ITicket[];
}
