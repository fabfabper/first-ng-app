import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const token = localStorage.getItem('token') ?? '';
  request.headers.set('Authorization', token ? `Bearer ${token}` : '');
  return next(request);
};
