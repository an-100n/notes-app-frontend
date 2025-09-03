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
  const [draftTitle, setDraftTitle] = useState("")
  const [draftBody, setDraftBody] = useState("")

  const TITLE_MAX = 1000
  const BODY_MAX = 6000

  function open() {
    setDraftTitle(title)
    setDraftBody(body)
    setIsOpen(true)
  }

  function close() {
    setIsOpen(false)
  }

  function save() {
    const t = draftTitle.trim()
    const tooLongTitle = draftTitle.length > TITLE_MAX
    const tooLongBody = draftBody.length > BODY_MAX
    if (!t || tooLongTitle || tooLongBody) return
    setTitle(t)
    setBody(draftBody)
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
                  className="rounded py-1 px-2 text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  aria-label="Close"
                >✕</button>
              </div>
              <div className="p-4 space-y-3">
                <div className="rounded-md border border-neutral-300 dark:border-neutral-700 focus-within:ring-2 focus-within:ring-neutral-400">
                  <input
                    type="text"
                    value={draftTitle}
                    onChange={(e) => setDraftTitle(e.target.value)}
                    placeholder="Title"
                    aria-label="Note title"
                    maxLength={TITLE_MAX + 1}
                    className="block w-full border-0 bg-transparent px-3 py-2 text-sm outline-none placeholder:text-neutral-400"
                  />
                  <div className="h-px bg-neutral-200 dark:bg-neutral-800" />
                  <textarea
                    value={draftBody}
                    onChange={(e) => setDraftBody(e.target.value)}
                    placeholder="Body"
                    aria-label="Note body"
                    rows={12}
                    className="block w-full border-0 bg-transparent px-3 py-2 text-sm outline-none resize-y placeholder:text-neutral-400 min-h-[280px]"
                  />
                </div>
                {(!draftTitle.trim() || draftTitle.length > TITLE_MAX || draftBody.length > BODY_MAX) && (
                  <p className="text-sm text-red-600">
                    {!draftTitle.trim() ? "Title is required" : draftTitle.length > TITLE_MAX ? `Title exceeds ${TITLE_MAX} characters` : `Body exceeds ${BODY_MAX} characters`}
                  </p>
                )}
                <p className="text-xs text-neutral-500">
                  Title: {draftTitle.length}/{TITLE_MAX} • Body: {draftBody.length}/{BODY_MAX}
                </p>
              </div>
              <div className="flex items-center justify-end gap-2 px-4 py-3 border-t border-neutral-200 dark:border-neutral-800">
                <Button variant="ghost" onClick={close}>Cancel</Button>
                <Button onClick={save} disabled={!draftTitle.trim() || draftTitle.length > TITLE_MAX || draftBody.length > BODY_MAX}>Save</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
