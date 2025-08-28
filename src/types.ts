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


export interface RegisterRequest {
    username: string;
    email: string;
    password: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface UserResponse {
    id: string;       // UUID as string
    username: string;
    email: string;
}