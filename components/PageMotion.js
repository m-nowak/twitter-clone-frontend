import { motion as m, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";

export default function PageMotion({ children }) {
  const router = useRouter();
  return (
    <AnimatePresence>
      <m.div
        key={router.route}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.5 } }}
        exit={{ opacity: 0 }}
      >
        {children}
      </m.div>
    </AnimatePresence>
  );
}
