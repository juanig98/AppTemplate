import { TestBed } from '@angular/core/testing';

import { PermissionService } from './permission.service';

describe('PermissionsService', () => {
  let service: PermissionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PermissionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
