import React from 'react';

interface ButtonProps {
    content: string;
    onClick?: () => void;
    className?: string;
}

export const Button: React.FC<ButtonProps> = ({content, onClick, className}) => {
    return (
        <button className={className} onClick={onClick}>
            {content}
        </button>
    );
};