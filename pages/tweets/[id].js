import PageMotion from "../../components/PageMotion";
import { useAccount } from "../../contexts/AccountContext";
import { useRouter } from "next/router";
import { ArrowLeftIcon } from "@heroicons/react/outline";
import dynamic from "next/dynamic";

const Layout = dynamic(() => import("../../components/Layout"));
const PageTitle = dynamic(() => import("../../components/PageTitle"));
const TweetDetail = dynamic(() => import("../../components/TweetDetail"));

export default function Tweet() {
  const router = useRouter();
  const { id } = router.query;
  const customMeta = {
    title: "Tweet",
  };

  return (
    <>
      <Layout customMeta={customMeta}>
        <PageMotion>
          <PageTitle text="Tweet" Icon={ArrowLeftIcon} />
          <TweetDetail id={id} />
        </PageMotion>
      </Layout>
    </>
  );
}
