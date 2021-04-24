import { Category } from '../common/interfaces';

export const getCategories = (): Promise<Category[]> => {
  return fetch(`${process.env.REACT_APP_API}/categories`)
    .then((response) => {
      return (response.json() as unknown) as Category[]
    });
};
