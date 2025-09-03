import type { NoteRequest, NoteResponse, Folder } from "../types";
import { getToken } from "./auth";
import data from "@/assets/data.json"


const BASE_URL: string = import.meta.env.VITE_API_BASE_URL;

type DataFile = {
  folders: Folder[]
  notes: NoteResponse[]
}
const typed = data as DataFile

export function getNotesLocal(): NoteResponse[] {
  return typed.notes
}

export function getFoldersLocal(): Folder[] {
  try {
    const extra = typeof window !== "undefined" ? window.localStorage.getItem("folders") : null
    const parsed: Folder[] = extra ? JSON.parse(extra) : []
    return [...typed.folders, ...parsed]
  } catch {
    return typed.folders
  }
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

// Local-only helper to create a folder persisted in localStorage
export function createFolderLocal(folderName: string): Folder {
  const name = folderName.trim()
  if (!name) throw new Error("Folder name is required")
  const id = (typeof crypto !== "undefined" && crypto.randomUUID) ? crypto.randomUUID() : `${Date.now()}`
  const newFolder: Folder = { id, folderName: name }

  if (typeof window !== "undefined") {
    try {
      const existing = window.localStorage.getItem("folders")
      const arr: Folder[] = existing ? JSON.parse(existing) : []
      arr.push(newFolder)
      window.localStorage.setItem("folders", JSON.stringify(arr))
    } catch (e) {
      // swallow to allow UI to continue; caller can still use returned value
      console.error("Failed to persist folder to localStorage", e)
    }
  }

  return newFolder
}
