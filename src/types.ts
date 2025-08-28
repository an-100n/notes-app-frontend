// src/types.ts
export interface NoteRequest {
  noteTitle: string;   // <= 1000 chars (frontend will validate)
  noteBody: string;    // <= 6000 chars
  folder: string;      // matches backend NoteReqDto.folder
}

export interface NoteResponse {
  id: string;          // UUID serialized as string in JSON
  noteTitle: string;
  noteBody: string;
  folderId: string;    // UUID serialized as string
}
