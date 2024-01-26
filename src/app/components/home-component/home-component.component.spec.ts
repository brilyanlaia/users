import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponentComponent } from './home-component.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserService } from '../../shared/services/user-service.service';
import { of } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { DEFAULT_COLUMNS } from '../../shared/constant/default-columns.const';

describe('HomeComponentComponent', () => {
  let component: HomeComponentComponent;
  let fixture: ComponentFixture<HomeComponentComponent>;
  let userServiceSpy: jasmine.SpyObj<UserService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const userServiceSpyObj = jasmine.createSpyObj<UserService>('UserService', [
      'getUserList',
    ]);
    const routerSpyObj = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.overrideComponent(HomeComponentComponent, {
      remove: { providers: [UserService, BreakpointObserver] },
    });

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, NoopAnimationsModule],
      providers: [
        { provide: UserService, useValue: userServiceSpyObj },
        {
          provide: Router,
          useValue: routerSpyObj,
        },
      ],
    }).compileComponents();

    userServiceSpy = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture = TestBed.createComponent(HomeComponentComponent);
    component = fixture.componentInstance;

    userServiceSpy.getUserList.and.returnValue(of([]));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should call getUserList', () => {
      component.ngOnInit();
      expect(userServiceSpy.getUserList).toHaveBeenCalled();
    });
  });

  describe('showMore', () => {
    it('should set isMore to true and update displayedColumns', () => {
      component.isMore = false;
      component.extraColumn = ['extra1', 'extra2'];
      component.displayedColumns = ['col1', 'col2'];

      component.showMore();

      expect(component.isMore).toBeTrue();
      expect(component.displayedColumns).toEqual([
        'extra1',
        'extra2',
        'col1',
        'col2',
      ]);
    });
  });

  describe('showLess', () => {
    it('should set isMore to false and reset displayedColumns to DEFAULT_COLUMNS', () => {
      component.isMore = true;
      component.displayedColumns = [
        'name',
        'phone',
        'username',
        'extra',
        'extra',
      ];

      const _default = DEFAULT_COLUMNS;
      component.showLess();

      expect(component.isMore).toBeFalse();
      expect(component.displayedColumns).toEqual(_default);
    });
  });

  describe('showStacked', () => {
    it('should set isStacked to true', () => {
      component.isStacked = false;

      component.showStacked();

      expect(component.isStacked).toBeTrue();
    });
  });

  describe('showTable', () => {
    it('should set isStacked to false', () => {
      component.isStacked = true;

      component.showTable();

      expect(component.isStacked).toBeFalse();
    });
  });

  describe('handleRowClick', () => {
    it('should navigate to the correct route', () => {
      const userId = 123;

      component.handleRowClick(userId);

      expect(routerSpy.navigate).toHaveBeenCalledWith([`/user/${userId}`]);
    });
  });
});
