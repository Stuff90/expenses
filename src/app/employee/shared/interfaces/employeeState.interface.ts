import { Employee } from './employee.interface';

export interface EmployeeState {
  list: {[id: string]: Employee};
  form: {
    data?: Employee;
    submit: boolean;
  }
}