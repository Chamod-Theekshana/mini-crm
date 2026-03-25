import { beforeEach, describe, expect, it } from 'vitest';
import { clearAuth, getStoredToken, getStoredUser, storeAuth } from './authStorage';

describe('authStorage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('stores and retrieves auth state', () => {
    storeAuth({ token: 'abc123', user: { id: '1', name: 'Alex' } });

    expect(getStoredToken()).toBe('abc123');
    expect(getStoredUser()).toEqual({ id: '1', name: 'Alex' });
  });

  it('clears auth state', () => {
    storeAuth({ token: 'abc123', user: { id: '1', name: 'Alex' } });
    clearAuth();

    expect(getStoredToken()).toBeNull();
    expect(getStoredUser()).toBeNull();
  });
});
