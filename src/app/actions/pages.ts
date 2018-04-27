import { createAction } from 'redux-actions';
import { PageModel } from 'app/models';

export namespace PageActions {
  export enum Type {
    NEXT_PAGE = 'NEXT_PAGE',
    PREV_PAGE = 'PREV_PAGE',
    JUMP_PAGE = 'JUMP_PAGE',
    FIRST_PAGE = 'FIRST_PAGE',
    LAST_PAGE = 'LAST_PAGE',
  }

  export const nextPage = createAction<PageModel>(Type.NEXT_PAGE);
  export const prevPage = createAction<PageModel>(Type.PREV_PAGE);
  export const jumpPage = createAction<PageModel>(Type.JUMP_PAGE);
  export const firstPage = createAction<PageModel>(Type.FIRST_PAGE);
  export const lastPage = createAction<PageModel>(Type.LAST_PAGE);

}

export type PageActions = Omit<typeof PageActions, 'Type'>;
