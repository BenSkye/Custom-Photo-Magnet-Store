import { Button as AntButton } from 'antd';
import { ButtonProps as AntButtonProps } from 'antd/lib/button';
import { AnimateWrapper } from '../../utils/animate/AnimateWrapper';
import classNames from 'classnames';

interface ButtonProps extends Omit<AntButtonProps, 'variant'> {
    variant?: 'primary' | 'secondary' | 'custom';
    bgColor?: string;
    textColor?: string;
    hoverColor?: string;
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
        'transition-all duration-200 !border-none hover:!border-none transform hover:scale-105', // thêm transform và scale
        {
            '!bg-[#7C3AED] !text-white hover:!bg-[#6D28D9]': variant === 'primary',
            '!bg-[#2DD4BF] !text-white hover:!bg-[#14B8A6]': variant === 'secondary',
            [`!${bgColor} !${textColor} ${hoverColor}`]: variant === 'custom',
        },
        className
    );

    return (
        <AnimateWrapper variant="slideDown" delay={0.2}>
            <AntButton
                className={buttonClasses}
                {...props}
            >
                {children}
            </AntButton>
        </AnimateWrapper>
    );
};