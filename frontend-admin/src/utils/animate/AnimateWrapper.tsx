import { motion, MotionProps } from 'framer-motion';

interface AnimateWrapperProps extends MotionProps {
    children: React.ReactNode;
    variant?: 'fadeIn' | 'slideLeft' | 'slideRight' | 'slideUp' | 'slideDown';
    delay?: number;
    duration?: number;
    className?: string;
}

const variants = {
    fadeIn: {
        initial: { opacity: 0 },
        animate: { opacity: 1 }
    },
    slideLeft: {
        initial: { opacity: 0, x: -50 },
        animate: { opacity: 1, x: 0 }
    },
    slideRight: {
        initial: { opacity: 0, x: 50 },
        animate: { opacity: 1, x: 0 }
    },
    slideUp: {
        initial: { opacity: 0, y: 50 },
        animate: { opacity: 1, y: 0 }
    },
    slideDown: {
        initial: { opacity: 0, y: -50 },
        animate: { opacity: 1, y: 0 }
    }
};

export const AnimateWrapper: React.FC<AnimateWrapperProps> = ({
    children,
    variant = 'fadeIn',
    delay = 0,
    duration = 0.5,
    className = '',
    ...motionProps
}) => {
    return (
        <motion.div
            initial={variants[variant].initial}
            animate={variants[variant].animate}
            transition={{ duration, delay }}
            className={className}
            {...motionProps}
        >
            {children}
        </motion.div>
    );
};