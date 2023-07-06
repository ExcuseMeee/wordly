"use client";

import { useRef } from "react";
import Settings from "./Settings";
import { useWordly } from "../context/WordlyContext";

const Navbar = () => {
  const modalRef = useRef<HTMLDialogElement>(null);

  const { setModalOpen } = useWordly();

  return (
    <>
      <nav className="border border-black grid grid-cols-3">
        <div className="col-span-1">{/* Intentionally Blank */}</div>
        <div className="col-span-1">
          <p className="flex justify-center items-center">Wordly</p>
        </div>
        <div className="col-span-1">
          <div
            className="flex justify-center hover:cursor-pointer"
            onClick={() => {
              modalRef.current?.showModal();
              setModalOpen(true);
            }}
          >
            Settings
          </div>
        </div>
      </nav>
      <dialog
        ref={modalRef}
        className="focus:outline-none"
        onClose={() => setModalOpen(false)}
      >
        <Settings modalRef={modalRef} />
      </dialog>
    </>
  );
};

export default Navbar;
