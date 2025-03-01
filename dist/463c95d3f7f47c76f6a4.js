// ✅ Declare handleCredentialResponse first to ensure it's globally available
// eslint-disable-next-line func-names
window.handleCredentialResponse = function (response) {
  // ✅ Import modules only inside the function to ensure they load correctly
  // eslint-disable-next-line import/extensions
  import('../controller/todo-panel-control.js').then(
    ({ default: TodoPanelController }) => {
      // eslint-disable-next-line import/extensions
      import('../model/users.js').then(({ default: User }) => {
        // Helper function to decode JWT
        function parseJwt(token) {
          const base64Url = token.split('.')[1];
          const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
          return JSON.parse(atob(base64));
        }

        // Process Google Sign-In response
        const payload = parseJwt(response.credential);
        // eslint-disable-next-line no-console
        console.log('Google Sign-In payload:', payload); // Debugging log
        const id = payload.email.toLowerCase();
        const storedData = JSON.parse(localStorage.getItem(id)) || null;

        if (!storedData) {
          const controller = new TodoPanelController(new User(id, undefined));
          controller.saveToLocalStorage();
        } else if (storedData.email === id) {
          // eslint-disable-next-line no-new
          new TodoPanelController(storedData);
        }
      });
    }
  );
};
