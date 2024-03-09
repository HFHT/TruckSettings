import './modal.css';
import { ReactNode, useState } from "react";

interface ModalType {
    children?: ReactNode;
    classes?: string;
    isOpen: boolean;
    toggle: () => void;
}

export function Modal({isOpen, toggle, classes='', children}: ModalType) {
    return (
        <>
            {isOpen && (
                <div className={`modal-overlay`} onClick={toggle}>
                    <div onClick={(e) => e.stopPropagation()} className={`${classes} modal-box`}>
                        {children}
                    </div>
                </div>
            )}
        </>
    );
}

export function useModal() {
    const [isOpen, setisOpen] = useState(false);

    const toggle = () => {
        console.log(isOpen)
        setisOpen(!isOpen);
    };

    return {
        isOpen,
        toggle
    };
}
