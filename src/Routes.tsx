import ListContainer from 'components/ListContainer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NotFound from 'routers/NotFound';
import TodoList from 'routers/TodoList';

export const routes = {
  todo: 'todo',
  doing: 'doing',
  done: 'done',
};

const Router = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<TodoList />}></Route>
        <Route path="/*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
