// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyCPgNBqo36HIs1gFnMY9VmULNKaszCDsoU',
    authDomain: 'expenses-fcd99.firebaseapp.com',
    databaseURL: 'https://expenses-fcd99.firebaseio.com',
    projectId: 'expenses-fcd99',
    storageBucket: '',
    messagingSenderId: '796647834823'
  }
};
