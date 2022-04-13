import { atom, selector } from 'recoil';

export enum FormCategory {
  'TO_DO' = 'TO_DO',
  'DOING' = 'DOING',
  'DONE' = 'DONE',
}

export interface IForm {
  id: number;
  todo: string;
  category: FormCategory;
}

export const todoListState = atom<IForm[]>({
  key: 'todoList',
  default: JSON.parse(localStorage.getItem('TODOLLLISTT')!) || [],
});

export const todoCategoryState = atom<FormCategory>({
  key: 'todoCategory',
  default: FormCategory.TO_DO,
});

export const todoSelector = selector({
  key: 'todoSelector',
  get: ({ get }) => {
    const todoList = get(todoListState);
    const todoCategory = get(todoCategoryState);

    return todoList.filter((todo) => todo.category === todoCategory);
  },
});
