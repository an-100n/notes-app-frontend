// src/pages/Home.tsx
import { getNotesLocal } from "../helpers/api"
import type { NoteResponse } from "../types"
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardDescription,
} from "../components/ui/card"

export default function Home() {
    const notes: NoteResponse[] = getNotesLocal()

    return (
        <div className="p-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {notes.map((n) => (
                <Card key={n.id} className="overflow-hidden">
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
    )
}
