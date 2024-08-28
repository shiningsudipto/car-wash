import React, { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ModalProps {
  label: ReactNode;
  title?: string;
  children: ReactNode;
  btnStyle?: string;
}

const Modal: React.FC<ModalProps> = ({ label, title, children, btnStyle }) => {
  return (
    <Dialog>
      <DialogTrigger className={btnStyle}>{label}</DialogTrigger>
      <DialogContent className="lg:w-[500px] lg:mt-[120px]">
        <DialogHeader>
          <DialogTitle className="text-center text-secondaryColor">
            {title}
          </DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
