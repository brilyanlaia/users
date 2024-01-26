import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilityService {
  constructor() {}

  getErrorMessage(error: any): string {
    if (error && error.message) {
      return error.message;
    }
    if (error && error.error && error.error.message) {
      return error.error.message;
    } else {
      return 'Something went wrong';
    }
  }
}
