import { FormCategory, IForm, todoCategoryState, todoListState } from 'atoms';
import { useRecoilState } from 'recoil';

const ListItem = ({ id, todo, category }: IForm) => {
  const [todoCategory, setTodoCategory] = useRecoilState(todoCategoryState);
  const [todoList, setTodoList] = useRecoilState(todoListState);

  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    const {
      currentTarget: { value },
    } = event;

    const todoIndex: number = todoList.findIndex((todo) => todo.id === id);
    const newTodoList = [
      ...todoList.slice(0, todoIndex),
      {
        id,
        todo,
        category: value,
      },
      ...todoList.slice(todoIndex + 1),
    ];

    setTodoList(newTodoList as IForm[]);
  };

  const onClickDelete = () => {
    const todoIndex: number = todoList.findIndex((todo) => todo.id === id);

    const newTodoList = [
      ...todoList.slice(0, todoIndex),
      ...todoList.slice(todoIndex + 1),
    ];

    setTodoList(newTodoList as IForm[]);
  };

  return (
    <li key={id}>
      <div className="todo__info">
        <div className="todo__category">
          <select value={todoCategory} onInput={onInput}>
            <option value={FormCategory.TO_DO} key={FormCategory.TO_DO}>
              준비
            </option>
            <option value={FormCategory.DOING} key={FormCategory.DOING}>
              진행
            </option>
            <option value={FormCategory.DONE} key={FormCategory.DONE}>
              종료
            </option>
          </select>
        </div>
        <button onClick={onClickDelete}>삭제</button>
      </div>
      {todo}
    </li>
  );
};

export default ListItem;
