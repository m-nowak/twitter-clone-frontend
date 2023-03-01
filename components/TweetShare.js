import { ShareIcon } from "@heroicons/react/outline";

export default function TweetShare() {
  const data = {
    title: "Twitter-Clone",
    text: "See Twitter clone wrote in Next.js and DRF.",
    url: process.env.NEXT_PUBLIC_NEXT_URL,
  };

  async function share() {
    try {
      await navigator.share(data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <button
        onClick={share}
        className="h-9 w-9 hoverItem p-2 hover:text-sky-500 hover:bg-sky-100"
      >
        <ShareIcon />
      </button>
    </>
  );
}
