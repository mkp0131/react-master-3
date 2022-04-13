import ListContainer from 'components/ListContainer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TodoList from 'routers/TodoList';

export const routes = {
  todo: 'todo',
  doing: 'doing',
  done: 'done',
};

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TodoList />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
