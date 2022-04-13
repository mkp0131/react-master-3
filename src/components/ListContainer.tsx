import { todoListState, todoSelector } from 'atoms';
import { useRecoilState, useRecoilValue } from 'recoil';
import ListItem from './ListItem';

const ListContainer = () => {
  // const [todoList, setTodoList] = useRecoilState(todoListState);
  const todoList = useRecoilValue(todoSelector);

  return (
    <ul className="todo-list">
      {todoList.map((todo) => {
        return <ListItem {...todo} key={todo.id} />;
      })}
    </ul>
  );
};

export default ListContainer;
