import { useEnvironmentsStore } from './EnvironmentsContext';


export const useTaskDatabaseHandler = () => {

  const environmentsStore = useEnvironmentsStore();

  const updateTaskOnDatabase = (task) => {
    const environment = environmentsStore.getEnvironment();

    if (environment.tasks) {
      environment.tasks.push(task);
    } else {
      environment.tasks = [task];
    }
    environmentsStore.setEnvironment(environment);
  };

  const deleteTaskOnDatabase = (task) => {
    const environment = environmentsStore.getEnvironment();

    environment.tasks = environment.tasks.filter((el) => el !== task);

    if (environment.tasks.length <= 0) {
      environment.tasks = [];
      environmentsStore.setEnvironment(environment);
    } else {
      environmentsStore.setEnvironment(environment);
    }
  };

  return {
    updateTaskOnDatabase,
    deleteTaskOnDatabase
  };

  const uploadUserTokenId = (token) => {
    // upload to the user here, and maybe assign it to the flatmates
  }
};
