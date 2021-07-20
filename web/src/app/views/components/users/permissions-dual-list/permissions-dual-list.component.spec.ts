import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionsDualListComponent } from './permissions-dual-list.component';

describe('PermissionsDualListComponent', () => {
  let component: PermissionsDualListComponent;
  let fixture: ComponentFixture<PermissionsDualListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PermissionsDualListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PermissionsDualListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
