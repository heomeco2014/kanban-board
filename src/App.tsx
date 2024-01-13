import KanbanNew from './app/pages/Kanban copy/components/KanbanNew'
import KanbanWrapper, { Kanban } from './app/pages/Kanban/components/Kanban'
import { kanbanStore } from './app/pages/Kanban/utils/store'
import { Provider } from 'react-redux'

function App() {
  return (
    <>
      <Provider store={kanbanStore}>
        <KanbanWrapper>
          <KanbanNew />
        </KanbanWrapper>
      </Provider>
    </>
  )
}

export default App
