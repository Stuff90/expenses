import { Action } from '@ngrx/store';

import { FileActions, FILE_UPDATE, FILE_UPLOADED, REMOVE_FILE } from './upload.actions';

export interface FileStateItem {
  name: string;
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
      console.log(action.payload);
      return Object.assign({}, state,
        {
          [action.payload.name]: action.payload
        }
      );

    case FILE_UPDATE:
      if (action.payload.name in state) {
        return Object.assign({}, state,
          {
            [action.payload.name]: {
              src: state[action.payload.name].src,
              name: action.payload.name || state[action.payload.name].name
            }
          }
        );
      } else {
        return Object.assign({}, state, {
          [action.payload.name]: {
            name: action.payload.name,
            src: action.payload.src || '#',
          }
        });
      }

		default:
			return state;
	}
}