import { Button as AntButton } from 'antd';
import { ButtonProps as AntButtonProps } from 'antd/lib/button';
import classNames from 'classnames';

interface ButtonProps extends Omit<AntButtonProps, 'variant'> {
    variant?: 'primary' | 'secondary' | 'custom';
    bgColor?: string;        // Tailwind background class
    textColor?: string;      // Tailwind text class
    hoverColor?: string;     // Tailwind hover class
}

export const Button: React.FC<ButtonProps> = ({
    variant = 'primary',
    bgColor,
    textColor = 'text-white',
    hoverColor = 'hover:opacity-90',
    className,
    children,
    ...props
}) => {
    const buttonClasses = classNames(
        'transition-all',
        {
            '!bg-[#7C3AED] !text-white': variant === 'primary',
            '!bg-[#2DD4BF] !text-white': variant === 'secondary',
            [`!${bgColor} !${textColor} ${hoverColor}`]: variant === 'custom',
        },
        className
    );

    return (
        <AntButton
            className={buttonClasses}
            {...props}
        >
            {children}
        </AntButton>
    );
};