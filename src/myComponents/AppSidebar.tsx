import { Home, Folder, User2, ChevronUp, Plus } from "lucide-react"
import { Link, useLocation } from "react-router"
import { getFoldersLocal, createFolderLocal } from "@/helpers/api"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from "@/components/ui/dropdown-menu"





export function AppSidebar() {
  const location = useLocation()
  const pathname = location.pathname
  const [folders, setFolders] = useState(getFoldersLocal())
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [newFolderName, setNewFolderName] = useState("")
  const MAX = 100

  function openCreate() {
    setNewFolderName("")
    setIsCreateOpen(true)
  }
  function closeCreate() {
    setIsCreateOpen(false)
  }
  function saveCreate() {
    const name = newFolderName.trim()
    if (!name || name.length > MAX) return
    try {
      createFolderLocal(name)
      setFolders(getFoldersLocal())
      closeCreate()
    } catch (e) {
      console.error(e)
      window.alert((e as Error).message || "Failed to create folder")
    }
  }
  return (
    <Sidebar collapsible="icon" variant="floating">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem key="home">
                <SidebarMenuButton asChild isActive={pathname === "/"}>
                  <Link to="/">
                    <Home />
                    <span>Home</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {folders.map((f) => (
                <SidebarMenuItem key={f.id}>
                  <SidebarMenuButton asChild isActive={pathname === `/folder/${f.id}`}>
                    <Link to={`/folder/${f.id}`}>
                      <Folder />
                      <span>{f.folderName}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarSeparator className="!w-full mx-0" />
              <SidebarMenuItem>
                <SidebarMenuButton onClick={openCreate}>
                  <Plus />
                  <span>New folder</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton>
                    <User2 /> Log in
                    <ChevronUp className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="top"
                  className="w-[--radix-popper-anchor-width]"
                >
                  <DropdownMenuItem>
                    <span>Account</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Billing</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>

      {isCreateOpen && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50" onClick={closeCreate} />
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div className="w-full max-w-md rounded-lg bg-white dark:bg-neutral-900 shadow-lg border border-neutral-200 dark:border-neutral-800">
              <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-200 dark:border-neutral-800">
                <h2 className="text-base font-semibold">New Folder</h2>
              </div>
              <div className="p-4 space-y-3">
                <div className="rounded-md border border-neutral-300 dark:border-neutral-700 focus-within:ring-2 focus-within:ring-neutral-400">
                  <input
                    type="text"
                    value={newFolderName}
                    onChange={(e) => setNewFolderName(e.target.value)}
                    placeholder="Folder name"
                    aria-label="Folder name"
                    maxLength={MAX + 1}
                    className="block w-full border-0 bg-transparent px-3 py-2 text-sm outline-none placeholder:text-neutral-400"
                    autoFocus
                  />
                </div>
                {(!newFolderName.trim() || newFolderName.length > MAX) && (
                  <p className="text-sm text-red-600">
                    {!newFolderName.trim() ? "Name is required" : `Name exceeds ${MAX} characters`}
                  </p>
                )}
              </div>
              <div className="flex items-center justify-end gap-2 px-4 py-3 border-t border-neutral-200 dark:border-neutral-800">
                <Button variant="ghost" onClick={closeCreate}>Cancel</Button>
                <Button onClick={saveCreate} disabled={!newFolderName.trim() || newFolderName.length > MAX}>Save</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Sidebar>
  )
}
