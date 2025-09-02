// src/pages/Home.tsx
import { useState } from "react"
import { getNotesLocal } from "../helpers/api"
import { useParams } from "react-router"
import type { NoteResponse } from "../types"
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
  //  CardDescription,
} from "../components/ui/card"
import { Button } from "../components/ui/button"

export default function Home() {
    const params = useParams()
    const folderId = params.folderId
    const allNotes: NoteResponse[] = getNotesLocal()
    const notes = folderId ? allNotes.filter(n => n.folderId === folderId) : allNotes
    const [selected, setSelected] = useState<NoteResponse | null>(null)
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [combined, setCombined] = useState("")

    function openNote(n: NoteResponse) {
        setSelected(n)
        setTitle(n.noteTitle)
        setBody(n.noteBody)
        setCombined(`${n.noteTitle}${n.noteBody ? "\n" + n.noteBody : ""}`)
    }

    function closeModal() {
        setSelected(null)
    }

    return (
        <>
            <div className="p-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {notes.map((n) => (
                    <Card
                        key={n.id}
                        className="overflow-hidden cursor-pointer hover:shadow-md transition"
                        onClick={() => openNote(n)}
                    >
                        <CardHeader>
                            <CardTitle className="line-clamp-1">{n.noteTitle}</CardTitle>
                            {/* <CardDescription className="text-xs break-all">
                                {n.folderId}
                            </CardDescription> */}
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm leading-6 whitespace-pre-wrap">
                                {n.noteBody}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {selected && (
                <div className="fixed inset-0 z-50">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/50"
                        onClick={closeModal}
                    />
                    {/* Modal */}
                    <div className="absolute inset-0 flex items-center justify-center p-4">
                        <div className="w-full max-w-3xl rounded-lg bg-white dark:bg-neutral-900 shadow-lg border border-neutral-200 dark:border-neutral-800">
                            <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-200 dark:border-neutral-800">
                                <h2 className="text-base font-semibold"></h2>
                                <button
                                    onClick={closeModal}
                                    className="rounded p-1 text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                                    aria-label="Close"
                                >
                                    ✕
                                </button>
                            </div>
                            <div className="p-4 space-y-4">
                                <div className="space-y-2">
                                    <textarea
                                        id="note-combined"
                                        value={combined}
                                        onChange={(e) => setCombined(e.target.value)}
                                        placeholder={"Title on the first line\nBody starts on the next line"}
                                        className="min-h-[360px] w-full resize-y rounded-md border border-neutral-300 bg-transparent px-3 py-2 text-sm shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:border-neutral-700"
                                    />
                                </div>
                                {/* <div className="pt-2 border-t border-neutral-200 dark:border-neutral-800">
                                    <div className="text-xs uppercase tracking-wide text-neutral-500 mb-2">Preview</div>
                                    {(() => {
                                        const lines = combined.split(/\r?\n/)
                                        const t = lines[0] ?? ""
                                        const b = lines.slice(1).join("\n")
                                        return (
                                            <div>
                                                <h3 className="text-lg font-semibold mb-2 break-words">{t || "Untitled"}</h3>
                                                <p className="text-sm whitespace-pre-wrap leading-6">{b}</p>
                                            </div>
                                        )
                                    })()}
                                </div> */}
                            </div>
                            <div className="flex items-center justify-end gap-2 px-4 py-3 border-t border-neutral-200 dark:border-neutral-800">
                                <Button variant="ghost" onClick={closeModal}>Cancel</Button>
                                <Button
                                    onClick={() => {
                                        const lines = combined.split(/\r?\n/)
                                        const t = (lines[0] ?? "").trim()
                                        const b = lines.slice(1).join("\n")
                                        setTitle(t)
                                        setBody(b)
                                        closeModal()
                                    }}
                                >
                                    Save
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
