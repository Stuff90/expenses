import { Action } from '@ngrx/store';

import { FileActions, FILE_UPDATE, FILE_UPLOADED, REMOVE_FILE } from './upload.actions';

export interface FileStateItem {
  file: File;
  src: string;
  isReady?: boolean;
}

export interface FileState {
  [id: string]: FileStateItem;
}

export function fileReducer(state: FileState = {}, action: FileActions) {
	switch (action.type) {
    case REMOVE_FILE:
      return Object.keys(state).reduce((res, fileName) => {
        if (fileName !== action.payload) {
          res[fileName] = state[fileName];
        }

        return res;
      }, {});

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