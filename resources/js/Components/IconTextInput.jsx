import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function IconTextInput({ type = 'text', style={}, rounded='rounded-md', inputclassName = '', className='', icon=<></>, isFocused = false, ...props }, ref) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <div
            className={`flex flex-row flex-nowrap gap-3 items-center p-3 ${rounded} bg-gray-300 ` + className}
            style={style}
        >
            {icon}
            <input
                {...props}
                type={type}
                className={
                    'rounded-md p-0 bg-transparent border-0 outline-none w-full focus:border-0' +
                    inputclassName
                }
                ref={input}
            />
        </div>
    );
});
