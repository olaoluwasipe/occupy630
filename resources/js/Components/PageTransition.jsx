import { Transition } from '@headlessui/react';

export default function PageTransition({ children, show = true }) {
    return (
        <Transition
            show={show}
            enter="transition-opacity duration-300 ease-out"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-200 ease-in"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
        >
            <div className="animate-fade-in">
                {children}
            </div>
        </Transition>
    );
}



