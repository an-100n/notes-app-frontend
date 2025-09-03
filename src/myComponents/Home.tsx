// src/pages/Home.tsx
import { getNotesLocal } from "../helpers/api"
import { useParams } from "react-router"
import type { NoteResponse } from "../types"
import Note from "./Note"

export default function Home() {
  const params = useParams()
  const folderId = params.folderId
  const allNotes: NoteResponse[] = getNotesLocal()
  const notes = folderId ? allNotes.filter(n => n.folderId === folderId) : allNotes

  return (
    <div className="p-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {notes.map((n) => (
        <Note key={n.id} note={n} />
      ))}
    </div>
  )
}

