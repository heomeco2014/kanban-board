import Kanban from './app/pages/Kanban/components/Kanban';
import { kanbanStore } from './app/pages/Kanban/utils/store';
import { Provider } from 'react-redux';

function App() {
  return (
    <div>
      <Provider store={kanbanStore}>
        <Kanban />
      </Provider>
    </div>
  );
}

export default App;
