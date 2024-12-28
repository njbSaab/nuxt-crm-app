interface IAuthStore{
    email: string,
    name: string,
    status: boolean,
}

const defaulValue: {user:IAuthStore} = {
    user: {
        email: '',
        name: '',
        status: false,
    }
}

export const useAuthStore = defineStore("auth", {
    state: () => ({
      user: {
        email: "",
        name: "",
        status: false,
      },
    }),
    getters: {
      isAuth: (state) => state.user.status,
    },
    actions: {
      set(input) {
        this.$patch({ user: input });
        localStorage.setItem("auth", JSON.stringify(input));
      },
      restoreAuth() {
        const storedAuth = localStorage.getItem("auth");
        if (storedAuth) {
          this.$patch({ user: JSON.parse(storedAuth) });
        }
      },
      logout() {
        this.$patch({ user: { email: "", name: "", status: false } });
        localStorage.removeItem("auth");
      },
    },
  });
  
export const useIsLoadingStore = defineStore('isLoading', {
    state: () => ({
        isLoading: false
    }),
    actions: {
        set(data: boolean){
            this.$patch({
                isLoading: data
            })
        }
    }
})