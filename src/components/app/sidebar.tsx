"use client";

import { Logo } from "./logo";
import { NavList } from "./nav-list";

export function Sidebar() {
  return (
    <aside className="hidden lg:flex fixed inset-y-0 left-0 w-64 flex-col bg-cultiva-darkGreen text-white">
      <div className="p-5 border-b border-white/10">
        <Logo dark />
      </div>
      <NavList />
    </aside>
  );
}
