import { Action } from '@ngrx/store';
import { EmployeeState } from './interfaces/employeeState.interface';
import { EmployeeActions, EMPLOYEE_FORM_UPDATE, EMPLOYEE_FORM_SUBMIT, EMPLOYEE_FORM_RESET } from './employee.actions';

export function employeeReducer(state: EmployeeState = {
  list: {},
  form: {
    submit: false,
    data: {
      lastName: '',
      firstName: '',
      emailAddress: ''
    }
  }
}, action: EmployeeActions) {
	switch (action.type) {
		case EMPLOYEE_FORM_RESET:
      return Object.assign({}, state, {
        form: {
          submit: false,
          data: {
            email: '',
            lastName: '',
            firstName: '',
          }
        }
      });

		case EMPLOYEE_FORM_UPDATE:
      return Object.assign({}, state, {
        form: {
          submit: state.form.submit,
          data: action.payload
        }
      });

		default:
			return state;
	}
}