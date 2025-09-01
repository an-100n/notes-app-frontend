import type { NoteRequest, NoteResponse } from "../types";
import { getToken } from "./auth";
import data from "@/assets/data.json"


const BASE_URL: string = import.meta.env.VITE_API_BASE_URL;

type DataFile = {
  folders: { id: string; folderName: string }[]
  notes: NoteResponse[]
}
const typed = data as DataFile

export function getNotesLocal(): NoteResponse[] {
  return typed.notes
}


export async function getNotes(): Promise<NoteResponse[]> {
  const res = await fetch(`${BASE_URL}/notes`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  if (!res.ok) throw new Error("Failed to fetch notes");
  return res.json();
}

export async function createNote(note: NoteRequest): Promise<NoteResponse> {
  const res = await fetch(`${BASE_URL}/notes`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${getToken()}` },
    body: JSON.stringify(note),
  });
  if (!res.ok) throw new Error("Failed to create note");
  return res.json();
}