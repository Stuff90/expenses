import { Action } from '@ngrx/store';

export const REMOVE_FILE = '[File] File removed';
export const FILE_UPDATE = '[File] File updated';
export const FILE_UPLOADED = '[File] File uploaded';

export class FileRemoveAction implements Action {
  readonly type = REMOVE_FILE;
  constructor(public payload: string) {}
}

export class FileUpdateAction implements Action {
  readonly type = FILE_UPDATE;
  constructor(public payload: { src?: string, name: string }) {}
}

export class FileUploadedAction implements Action {
  readonly type = FILE_UPLOADED;
  constructor(public payload: {
    name: string,
    src: string,
  }) {}
}

export type FileActions = FileUpdateAction | FileUploadedAction | FileRemoveAction;
