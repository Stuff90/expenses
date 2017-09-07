import { Action } from '@ngrx/store';

export const FILE_UPDATE = '[File] File updated';
export const FILE_UPLOADED = '[File] File uploaded';

export class FileUpdateAction implements Action {
  readonly type = FILE_UPDATE;
  constructor(public payload: { file: File, name: string }) {}
}

export class FileUploadedAction implements Action {
  readonly type = FILE_UPLOADED;
  constructor(public payload: {
    name: string,
    src: string,
  }) {}
}

export type FileActions = FileUpdateAction | FileUploadedAction;
