import { Action } from '@ngrx/store';

import { FileActions, FILE_UPDATE, FILE_UPLOADED } from './upload.actions';

interface FileState {
  [id: string]: {
    file: File;
    src: string;
  }
}

export function fileReducer(state: FileState = {}, action: FileActions) {
	switch (action.type) {
    case FILE_UPLOADED:
      return Object.assign({}, state,
        {
          [action.payload.name]: {
            src: action.payload.src,
            file: state[action.payload.name].file,
          }
        }
      );

    case FILE_UPDATE:
      if (action.payload.name in state) {
        return Object.assign({}, state,
          {
            [action.payload.name]: {
              src: state[action.payload.name].src,
              file: Object.assign(
                {},
                state[action.payload.name].file,
                action.payload.file
              )
            }
          }
        );
      } else {
        return Object.assign({}, state, {
          [action.payload.name]: {
            file: action.payload.file,
            src: '#',
          }
        });
      }

		default:
			return state;
	}
}