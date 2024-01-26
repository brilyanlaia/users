import { TestBed } from '@angular/core/testing';

import { UtilityService } from './utility.service';

describe('UtilityService', () => {
  let service: UtilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtilityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return the error message if present', () => {
    const errorMessage = 'This is an error message';
    const error = { message: errorMessage };

    const result = service.getErrorMessage(error);

    expect(result).toEqual(errorMessage);
  });

  it('should return the error.error.message if both error and error.error.message are present', () => {
    const errorMessage = 'This is an error message';
    const error = { error: { message: errorMessage } };

    const result = service.getErrorMessage(error);

    expect(result).toEqual(errorMessage);
  });

  it('should return "Something went wrong" if no error message is present', () => {
    const result = service.getErrorMessage(null);

    expect(result).toEqual('Something went wrong');
  });
});
