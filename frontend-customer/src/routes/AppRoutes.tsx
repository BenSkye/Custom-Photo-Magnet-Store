import { Routes, Route } from 'react-router-dom';
import { routes } from './index';

const AppRoutes: React.FC = () => {
    return (
        <Routes>
            {routes.map((route) => (
                <Route
                    key={route.key}
                    path={route.path}
                    element={route.element}
                />
            ))}
        </Routes>
    );
};

export default AppRoutes;