import dynamic from "next/dynamic";
const Sidebar = dynamic(() => import("./Sidebar"));
const Meta = dynamic(() => import("./Meta"));
const Widgets = dynamic(() => import("./Widgets"));

export default function Layout({ children, customMeta }) {
  return (
    <>
      <Meta {...customMeta} />

      <main className="flex min-h-screen sm:max-w-3xl lg:max-w-5xl xl:max-w-7xl mx-auto">
        <Sidebar />
        <div className="border-[1px] border-gray-200 w-[598px] sm:ml-[68px] xl:ml-[278px]">
          {children}
        </div>
        <Widgets />
      </main>
    </>
  );
}
