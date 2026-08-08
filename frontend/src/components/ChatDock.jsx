// Wraps the shadcn-CLI-installed reactbits Dock component (see PRD Section 7 for
// the install command). Chat page only, single Home button, offset from every
// edge so it never touches a boundary.
import { Dock } from "./reactbits/Dock.jsx"; // populated by shadcn CLI
import { HomeIcon } from "./icons.jsx";

export default function ChatDock({ onHome }) {
  const items = [{ icon: <HomeIcon />, label: "Home", onClick: onHome }];

  return (
    <div className="fixed top-6 right-6 z-30 rounded-2xl overflow-hidden">
      <Dock items={items} />
    </div>
  );
}
