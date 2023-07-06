import { RefObject } from "react";

type ComponentProps = {
  modalRef: RefObject<HTMLDialogElement>;
};

const Settings = ({ modalRef }: ComponentProps) => {
  return <div>Settings</div>;
};
export default Settings;
