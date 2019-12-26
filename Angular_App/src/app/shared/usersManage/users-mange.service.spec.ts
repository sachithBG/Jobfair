import { TestBed } from '@angular/core/testing';

import { UsersMangeService } from './users-mange.service';

describe('UsersMangeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UsersMangeService = TestBed.get(UsersMangeService);
    expect(service).toBeTruthy();
  });
});
