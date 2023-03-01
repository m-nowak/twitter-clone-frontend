import Link from "next/link";
export default function SidebarItem({ text, Icon, active }) {
  let link = text.toLowerCase();
  if (link === "home") {
    link = "";
  }
  return (
    <Link href={`/`}>
      <div
        role="button"
        tabIndex={0}
        aria-label={text.toLowerCase()}
        className="hoverItem flex  items-center mt-2 text-gray-900 justify-center xl:justify-start text-xl space-x-3"
      >
        <Icon className="h-7" />
        <span className={`${active ? "font-bold" : ""} hidden xl:inline`}>
          {text}
        </span>
      </div>
    </Link>
  );
}
