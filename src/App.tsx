import { BrowserRouter as Router } from 'react-router-dom';
import Sidebar from './layout/Aside/Aside';
import AsideRoutes from './routes/asideRoutes';

function App() {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="flex-grow">
          <AsideRoutes />
        </div>
      </div>
    </Router>
  );
}

export default App;
