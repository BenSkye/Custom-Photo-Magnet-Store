import { BrowserRouter } from 'react-router-dom';
import MainLayout from './layout';
import AppRoutes from './routes/AppRoutes';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <MainLayout>
        <AppRoutes />
      </MainLayout>
    </BrowserRouter>
  );
};

export default App;