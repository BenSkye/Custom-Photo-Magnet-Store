import dayjs from 'dayjs';

export const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('vi-VN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

export const calculateTimeDistance = (date: string): string => {
    const now = new Date();
    const pastDate = new Date(date);
    const diffMs = now.getTime() - pastDate.getTime();
    
    // Chuyển đổi thành giây
    const seconds = Math.floor(diffMs / 1000);
    
    // Nếu dưới 60 giây
    if (seconds < 60) {
        return `${seconds} giây trước`;
    }
    
    // Chuyển đổi thành phút
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) {
        return `${minutes} phút trước`;
    }
    
    // Chuyển đổi thành giờ
    const hours = Math.floor(minutes / 60);
    if (hours < 24) {
        return `${hours} giờ trước`;
    }
    
    // Chuyển đổi thành ngày
    const days = Math.floor(hours / 24);
    if (days < 30) {
        return `${days} ngày trước`;
    }
    
    // Chuyển đổi thành tháng
    const months = Math.floor(days / 30);
    return `${months} tháng trước`;
};

export const formatTimeDate = (date: string): string => {
    return dayjs(date).format('HH:mm - DD/MM/YYYY');
};
