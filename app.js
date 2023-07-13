// Define the store using Vuex
const store = new Vuex.Store({
  state: {
    tasks: [],
    newTask: ''
  },
  mutations: {
    addTask(state) {
      state.tasks.push(state.newTask);
      state.newTask = '';
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    editTask(state, payload) {
      state.tasks[payload.index] = payload.updatedTask;
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    deleteTask(state, index) {
      state.tasks.splice(index, 1);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    initializeStore(state) {
      if (localStorage.getItem('tasks')) {
        state.tasks = JSON.parse(localStorage.getItem('tasks'));
      }
    }
  },
  actions: {
    addTask(context) {
      context.commit('addTask');
    },
    editTask(context, payload) {
      context.commit('editTask', payload);
    },
    deleteTask(context, index) {
      context.commit('deleteTask', index);
    }
  },
  getters: {
    tasks: state => state.tasks
  }
});

// Create the Vue instance
const app = new Vue({
  el: '#app',
  store,
  data: {
    newTask: ''
  },
  methods: {
    addTask() {
      this.$store.dispatch('addTask');
    },
    editTask(index) {
      const updatedTask = prompt('Enter updated task:', this.$store.state.tasks[index]);
      this.$store.dispatch('editTask', { index, updatedTask });
    },
    deleteTask(index) {
      this.$store.dispatch('deleteTask', index);
    }
  },
  created() {
    this.$store.commit('initializeStore');
  }
});
