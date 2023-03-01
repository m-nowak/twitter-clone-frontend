import PageMotion from "../components/PageMotion";
import { useAccount } from "../contexts/AccountContext";
import { useRouter } from "next/router";
import { SparklesIcon } from "@heroicons/react/outline";
import dynamic from "next/dynamic";
const TweetInput = dynamic(() => import("../components/TweetInput"));
const TweetList = dynamic(() => import("../components/TweetList"));
const Layout = dynamic(() => import("../components/Layout"));
const PageTitle = dynamic(() => import("../components/PageTitle"));

export default function Home() {
  const customMeta = {
    title: "Home",
  };

  return (
    <>
      <Layout customMeta={customMeta}>
        <PageMotion>
          <PageTitle text="Home" Icon={SparklesIcon} />
          <div className="border-b p-3 border-gray-200">
            <TweetInput placeholder="What's happening?" type="Tweet" />
          </div>
          <TweetList />
        </PageMotion>
      </Layout>
    </>
  );
}
