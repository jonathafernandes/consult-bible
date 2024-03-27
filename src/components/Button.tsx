import React from 'react';

interface ButtonProps {
    content: string;
    onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({content, onClick}) => {
    return (
        <button className='border-solid border-[1px] border-zinc-300 hover:border-rose-900 py-1 px-2 rounded' onClick={onClick}>
            {content}
        </button>
    );
};