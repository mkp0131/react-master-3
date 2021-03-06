import React from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { FormCategory, IForm, todoListState, todoCategoryState } from 'atoms';
import { Link, Outlet, useMatch, useParams } from 'react-router-dom';
import { routes } from 'Routes';
import ListItem from 'components/ListItem';
import ListContainer from 'components/ListContainer';
import { useEffect } from 'react';

// textarea ๋์ด ์กฐ์ 
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
        <h1>๐ TODO</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <textarea
            onKeyUp={textareaResize}
            {...register('todo', {
              required: 'ํ ์ผ์ ์ ์ด์ฃผ์ธ์!',
            })}
          ></textarea>
          <div className="util">
            <select value={todoCategory} onInput={onInput}>
              <option value={FormCategory.TO_DO} key={FormCategory.TO_DO}>
                ์ค๋น
              </option>
              <option value={FormCategory.DOING} key={FormCategory.DOING}>
                ์งํ
              </option>
              <option value={FormCategory.DONE} key={FormCategory.DONE}>
                ์ข๋ฃ
              </option>
            </select>
            <button type="submit">๋ฑ๋ก</button>
          </div>
        </form>
        <div className="todo-err-msg">{errors?.todo?.message}</div>
        <ul className="todo-category-list">
          <li className={todoCategory === FormCategory.TO_DO ? 'on' : ''}>
            <button onClick={() => setTodoCategory(FormCategory.TO_DO)}>
              ์ค๋น
            </button>
          </li>
          <li className={todoCategory === FormCategory.DOING ? 'on' : ''}>
            <button onClick={() => setTodoCategory(FormCategory.DOING)}>
              ์งํ
            </button>
          </li>
          <li className={todoCategory === FormCategory.DONE ? 'on' : ''}>
            <button onClick={() => setTodoCategory(FormCategory.DONE)}>
              ์ข๋ฃ
            </button>
          </li>
        </ul>
        <ListContainer />
      </div>
    </div>
  );
};

export default TodoList;
