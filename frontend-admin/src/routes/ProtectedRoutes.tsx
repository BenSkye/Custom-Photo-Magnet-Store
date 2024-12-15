import { Navigate, useLocation } from 'react-router-dom';
import MainLayout from '../layout';
import { useAuth } from '../hook/useAuth';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { isAuthenticated, isLoading } = useAuth();
    const location = useLocation();

    // Hiển thị loading state trong khi kiểm tra auth
    if (isLoading) {
        return <div>Loading...</div>; // Hoặc loading spinner component
    }

    if (!isAuthenticated) {
        // Redirect to login với return url
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <MainLayout>{children}</MainLayout>;
};