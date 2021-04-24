import { getCategories } from './categories';
import { getAuthors } from './authors';
import { ProcessedVideo, Category, Author } from '../common/interfaces';

export const getVideos = (): Promise<ProcessedVideo[]> => {
  return Promise
    .all([getCategories(), getAuthors()])
    .then(([categories, authors]) => {
      const videos: ProcessedVideo[] = processVideos(categories, authors);

      return videos;
    });
};

function processVideos(categories: Category[], authors: Author[]): ProcessedVideo[] {
  const categoriesObject = objectFromArray(categories, 'id');
  const videos = extractVideosFromAuthors(authors, categoriesObject);

  return videos;
}

function objectFromArray(array: any[], nameIdProp: string): object {
  const result: any = {};

  array.forEach((item: any) => {
    const id = item[nameIdProp];
    const newItem = { ...item };

    delete newItem[nameIdProp];

    result[id] = newItem;
  });

  return result;
}

function extractVideosFromAuthors(authors: Author[], categoriesObject: any): ProcessedVideo[] {
  const videos: ProcessedVideo[] = [];

  authors.forEach((author: Author) => {
    author.videos.forEach((video) => {
      const processedVideo: ProcessedVideo = {
        id: video.id,
        name: video.name,
        categories: video.catIds.map((catId: number) => {
          return categoriesObject[catId.toString()].name;
        }),
        author: author.name,
        format_quality_highest: 'best 1080p',
        date_release: '',
      }

      videos.push(processedVideo);
    });
  });

  return videos;
}