import './App.css';
import RoutesConfig from './components/RoutesConfig';
import { VideoProvider } from './services/VideoContext';

function App() {

  return (
    <VideoProvider>
      <RoutesConfig />
    </VideoProvider>
  );
}

export default App;
