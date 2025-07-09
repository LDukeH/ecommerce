import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import CloseIcon from "@/public/icon-close.svg";
import useModalStore from "@/store/modalStore";
import { motion } from "framer-motion";

export default function SideMenu() {
  const { closeSideMenu } = useModalStore();
  return (
    <motion.div
      className="w-screen h-screen inset-0 absolute z-10"
      key="sideMenu"
    >
      <motion.div
        initial={{ opacity: 0, backgroundColor: "rgba(0, 0, 0, 0)" }}
        animate={{ opacity: 0.7, backgroundColor: "rgba(0, 0, 0, 0.7)" }}
        exit={{ opacity: 0, backgroundColor: "rgba(0, 0, 0, 0)" }}
        transition={{ duration: 0.3 }}
        className="w-screen h-screen inset-0 absolute"
        onClick={closeSideMenu}
      ></motion.div>
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        exit={{ x: -300 }}
        transition={{ duration: 0.3 }}
      >
        <Sidebar className="z-30 h-screen font-bold bg-white text-4xl flex">
          <div className="p-8 w-fit" onClick={closeSideMenu}>
            <CloseIcon />
          </div>
          <Menu>
            <MenuItem>Collections</MenuItem>
            <MenuItem>Men</MenuItem>
            <MenuItem>Women</MenuItem>
            <MenuItem>About</MenuItem>
            <MenuItem>Contact</MenuItem>
          </Menu>
        </Sidebar>
      </motion.div>
    </motion.div>
  );
}
