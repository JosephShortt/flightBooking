export const auth = {
  save: (token, user) => {
    localStorage.setItem('adminToken', token);
    localStorage.setItem('adminUser', JSON.stringify(user));
  },
  clear: () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
  },
  getToken: () => localStorage.getItem('adminToken'),
  getUser: () => {
    const u = localStorage.getItem('adminUser');
    return u ? JSON.parse(u) : null;
  },
  isLoggedIn: () => !!localStorage.getItem('adminToken'),
};
