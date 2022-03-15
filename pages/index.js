import Head from "next/head";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { AnimatePresence } from "framer-motion";
import { useRecoilState } from "recoil";

import { Header, Sidebar, Feed, Modal } from "../components";
import { modalState, modalTypeState } from "../atoms/modalAtom";

export default function Home() {
  const [modalOpen, setModalOpen] = useRecoilState(modalState);
  const [modalType, setModalType] = useRecoilState(modalTypeState);
  const router = useRouter();
  const { data: session } = useSession({
    required: true,
    onUnauthenticated: () => {
      router.push("/home");
    },
  });
  return (
    <div className="bg-[#F2F2EF] dark:bg-black dark:text-white min-h-screen md:space-y-6">
      <Head>
        <title>Feed | LinkedIn</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <main className="flex justify-center gap-x-5 px-4 sm:px-12">
        <div className="flex flex-col md:flex-row gap-5">
          {/* Sidebar */}
          <Sidebar />
          {/* Feed */}
          <Feed />
        </div>
        {/* Widgets */}
        <AnimatePresence>
          {modalOpen && (
            <Modal handleClose={() => setModalOpen(false)} type={modalType} />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

//pre-fetch the user session on the sever side to prevent flickering
export const getServerSideProps = async (context) => {
  // Check if the user is authenticated
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/home",
      },
    };
  }
  return {
    props: {
      session,
    },
  };
};
