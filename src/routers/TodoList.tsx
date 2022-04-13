import React from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { FormCategory, IForm, todoListState, todoCategoryState } from 'atoms';
import { Link, Outlet, useMatch, useParams } from 'react-router-dom';
import { routes } from 'Routes';
import ListItem from 'components/ListItem';
import ListContainer from 'components/ListContainer';
import { useEffect } from 'react';

// textarea 높이 조절
function textareaResize(event: React.KeyboardEvent<HTMLTextAreaElement>) {
  const { currentTarget } = event;

  currentTarget.style.height = 'auto';
  currentTarget.style.height = 12 + currentTarget.scrollHeight + 'px';
}

const TodoList = () => {
  const [todoList, setTodoList] = useRecoilState(todoListState);
  const [todoCategory, setTodoCategory] = useRecoilState(todoCategoryState);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IForm>();

  const onSubmit = (data: IForm) => {
    setTodoList((prev) => [
      {
        id: Date.now(),
        todo: data.todo,
        category: todoCategory,
      },
      ...prev,
    ]);
    setValue('todo', '');
  };

  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setTodoCategory(value as FormCategory);
  };

  useEffect(() => {
    localStorage.setItem('TODOLLLISTT', JSON.stringify(todoList));
  }, [todoList]);

  return (
    <div className="container">
      <div className="inner">
        <h1>📝 TODO</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <textarea
            onKeyUp={textareaResize}
            {...register('todo', {
              required: '할일을 적어주세요!',
            })}
          ></textarea>
          <div className="util">
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
            <button type="submit">등록</button>
          </div>
        </form>
        <div className="todo-err-msg">{errors?.todo?.message}</div>
        <ul className="todo-category-list">
          <li className={todoCategory === FormCategory.TO_DO ? 'on' : ''}>
            <button onClick={() => setTodoCategory(FormCategory.TO_DO)}>
              준비
            </button>
          </li>
          <li className={todoCategory === FormCategory.DOING ? 'on' : ''}>
            <button onClick={() => setTodoCategory(FormCategory.DOING)}>
              진행
            </button>
          </li>
          <li className={todoCategory === FormCategory.DONE ? 'on' : ''}>
            <button onClick={() => setTodoCategory(FormCategory.DONE)}>
              종료
            </button>
          </li>
        </ul>
        <ListContainer />
      </div>
    </div>
  );
};

export default TodoList;
