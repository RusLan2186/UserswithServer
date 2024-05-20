import './scss/App.scss';
import Todos from './components/Todos/Todos';

const App: React.FC = () => {
  return (
    <div className='wrapper'>
      <h1>Hello</h1>
      <div className='users'>
        <Todos />
      </div>
    </div>
  );
};

export default App;
