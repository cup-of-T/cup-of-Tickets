import { ITicket } from "../interfaces/interface";

export const getTickets = async (accessToken: string) => {
  const response = await fetch(`${import.meta.env.VITE_API_SERVER_URL}/Tickets`, {
    headers: { Authorization: `Bearer ${accessToken}` }
  })
  return await response.json() as ITicket[];
}

export const postTicket = async (ticket: ITicket, accessToken: string) => {
  const ticketToJson = JSON.stringify(ticket);
  const response = await fetch(`${import.meta.env.VITE_API_SERVER_URL}/Tickets`, {
    method: 'POST',
    body: ticketToJson,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    },
  })
  return await response.json() as ITicket;
}

export const deleteTicket = async (ticketId: number, accessToken: string) => {
  await fetch(`${import.meta.env.VITE_API_SERVER_URL}/Tickets/${ticketId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    },
  })
}

export const updateTicketStatus = async (ticketId: number, status: number, accessToken: string) => {
  const statusToJson = JSON.stringify(status);
  const response = await fetch(`${import.meta.env.VITE_API_SERVER_URL}/Tickets/${ticketId}/status`, {
    method: 'PATCH',
    body: statusToJson,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    },
  })
  return await response.json() as ITicket[];
}

export const updateTicketAssignedTo = async (ticketId: number, assigneeId: number, accessToken: string) => {
  const assigneeIdToJson = JSON.stringify(assigneeId);
  const response = await fetch(`${import.meta.env.VITE_API_SERVER_URL}/Tickets/${ticketId}/assignedto`, {
    method: 'PATCH',
    body: assigneeIdToJson,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    },
  })
  return await response.json() as ITicket[];
}
