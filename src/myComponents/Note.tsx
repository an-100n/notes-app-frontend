import { useState } from "react"
import type { NoteResponse } from "../types"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../components/ui/card"
import { Button } from "../components/ui/button"

type NoteProps = {
  note: NoteResponse
}

export default function Note({ note }: NoteProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [title, setTitle] = useState(note.noteTitle)
  const [body, setBody] = useState(note.noteBody)
  const [combined, setCombined] = useState<string>("")

  function open() {
    setCombined(`${title}${body ? "\n" + body : ""}`)
    setIsOpen(true)
  }

  function close() {
    setIsOpen(false)
  }

  function save() {
    const lines = combined.split(/\r?\n/)
    const t = (lines[0] ?? "").trim()
    const b = lines.slice(1).join("\n")
    setTitle(t)
    setBody(b)
    close()
  }

  return (
    <>
      <Card
        key={note.id}
        className="overflow-hidden cursor-pointer hover:shadow-md transition"
        onClick={open}
      >
        <CardHeader>
          <CardTitle className="line-clamp-1">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-6 whitespace-pre-wrap">{body}</p>
        </CardContent>
      </Card>

      {isOpen && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50" onClick={close} />
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div className="w-full max-w-3xl rounded-lg bg-white dark:bg-neutral-900 shadow-lg border border-neutral-200 dark:border-neutral-800">
              <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-200 dark:border-neutral-800">
                <h2 className="text-base font-semibold"></h2>
                <button
                  onClick={close}
                  className="rounded p-1 text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  aria-label="Close"
                >
                  ?
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
              </div>
              <div className="flex items-center justify-end gap-2 px-4 py-3 border-t border-neutral-200 dark:border-neutral-800">
                <Button variant="ghost" onClick={close}>Cancel</Button>
                <Button onClick={save}>Save</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

