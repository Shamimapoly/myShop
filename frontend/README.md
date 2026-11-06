# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
asxcsa







  const login = useMutation({
    mutationFn: async ({ email, password,  }) => {
      const { data } = await api.post("/auth/login", {
        email: email,
        password: password,
     
      });
      return data;
      
    },
    
    onSuccess: (data) => {
      console.log(data.userinfo.userName);
      console.log(data.token);
      localStorage.setItem("token", data.token);
      localStorage.setItem("name", data.userinfo.userName);
      onSuccess?.();
    navigate("/products", { replace: true });
    },
    onError: (error) => {
      console.log(error);
      console.log(error.message);
    },
     onSettled: () => {
    setLoading(false);
  },
   
  });