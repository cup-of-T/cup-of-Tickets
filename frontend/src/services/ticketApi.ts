import { values } from "lodash";
import { IArchivedRequest, IAssigneeRequest, IStatusRequest, ITicket } from "../interfaces/interface";

export const getTickets = async (accessToken: string) => {
  const response = await fetch(`${import.meta.env.VITE_API_SERVER_URL}/Tickets`, {
    headers: { Authorization: `Bearer ${accessToken}` }
  })
  return await response.json() as ITicket[];
}

export const postTicket = async (ticket: Partial<ITicket>, accessToken: string) => {
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
  const statusRequest: IStatusRequest = { status: status };
  const statusToJson = JSON.stringify(statusRequest);
  fetch(`${import.meta.env.VITE_API_SERVER_URL}/Tickets/${ticketId}/status`, {
    method: 'PATCH',
    body: statusToJson,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    },
  });
}

export const updateTicketAssignedTo = async (ticketId: number, assigneeId: number, accessToken: string) => {
  const assigneeRequest: IAssigneeRequest = { assigneeId: assigneeId };
  const assigneeIdToJson = JSON.stringify(assigneeRequest);
  return await fetch(`${import.meta.env.VITE_API_SERVER_URL}/Tickets/${ticketId}/assignedto`, {
    method: 'PATCH',
    body: assigneeIdToJson,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    },
  })
}

export const updateTicketArchived = async (ticketId: number, archived: boolean, accessToken: string) => {
  const archivedRequest: IArchivedRequest = { archived: archived };
  const requestToJson = JSON.stringify(archivedRequest);
  return await fetch(`${import.meta.env.VITE_API_SERVER_URL}/Tickets/${ticketId}/archived`, {
    method: 'PATCH',
    body: requestToJson,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    },
  })
}