import { Author } from '../common/interfaces';

export const getAuthors = (): Promise<Author[]> => {
  return fetch(`${process.env.REACT_APP_API}/authors`)
    .then((response) => {
      return (response.json() as unknown) as Author[]
    });
};
