import { createAction } from 'redux-actions';
import { ImageModel } from 'app/models';

export namespace ImageActions {
  export enum Type {
    OPEN_FULL_SCREEN = 'OPEN_FULL_SCREEN',
    EXIT_FULL_SCREEN = 'EXIT_FULL_SCREEN',
  }

  export const openFullScreen = createAction<ImageModel['url']>(Type.OPEN_FULL_SCREEN);
  export const exitFullScreen = createAction(Type.EXIT_FULL_SCREEN);
}

export type ImageActions = Omit<typeof ImageActions, 'Type'>;
