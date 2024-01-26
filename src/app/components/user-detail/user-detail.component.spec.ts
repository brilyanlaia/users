import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { UserDetailComponent } from './user-detail.component';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserService } from '../../shared/services/user-service.service';
import { of, throwError } from 'rxjs';
import { UserDetail } from '../../shared/models/user.model';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('UserDetailComponent', () => {
  let component: UserDetailComponent;
  let fixture: ComponentFixture<UserDetailComponent>;
  let userServiceSpy: jasmine.SpyObj<UserService>;
  let routerSpy: jasmine.SpyObj<Router>;

  let userDetail: UserDetail;

  beforeEach(waitForAsync(() => {
    const activatedRouteSpy = {
      params: of({ id: 1 }),
    };

    const userServiceSpyObj = jasmine.createSpyObj<UserService>('UserService', [
      'getUserById',
    ]);
    const routerSpyObj = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.overrideComponent(UserDetailComponent, {
      remove: { providers: [UserService] },
    });

    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, HttpClientTestingModule],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteSpy },
        { provide: UserService, useValue: userServiceSpyObj },
        { provide: Router, useValue: routerSpyObj },
      ],
    }).compileComponents();

    userServiceSpy = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailComponent);
    component = fixture.componentInstance;

    userDetail = new UserDetail();
    userDetail.id = 1;
    userDetail.name = 'Test User';
    userDetail.email = 'test@test.com';

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#ngOnInit', () => {
    it('should fetch user detail on ngOnInit', () => {
      const _spy = spyOn(<any>component, '_getUserDetail');
      component.ngOnInit();

      expect(_spy).toHaveBeenCalledWith(1);
    });

    it('should not fetch user detail on ngOnInit if id is not present', () => {
      const _spy = spyOn(<any>component, '_getUserDetail');
      const activatedRoute: ActivatedRoute =
        fixture.debugElement.injector.get(ActivatedRoute);
      activatedRoute.params = of({});
      component.ngOnInit();

      expect(_spy).not.toHaveBeenCalled();
    });
  });

  describe('#_getUserDetail', () => {
    it('should set userDetail on _getUserDetail', () => {
      userServiceSpy.getUserById.and.returnValue(of(userDetail));

      component['_getUserDetail'](1);

      expect(userServiceSpy.getUserById).toHaveBeenCalledWith(1);
      expect(component.userDetail).toEqual(userDetail);
    });

    it('should not set userDetail on _getUserDetail if api call is error', () => {
      userServiceSpy.getUserById.and.returnValue(throwError({}));

      component['_getUserDetail'](1);

      expect(component.userDetail).not.toEqual(userDetail);
    });
  });

  it('should navigate to /users on goBack', () => {
    component.goBack();

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/users']);
  });
});
