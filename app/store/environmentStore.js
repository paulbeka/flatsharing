export const createEnvironmentStore = () => {
  return {
    environments: [
    //   {
    //   "name": "Test",
    //   "flatmates": ["John", "Jack"],
    //   "tasks": []
    // }
  ],
    addEnvironment(environment) {
      this.environments.push(environment);
    },
    getEnvironmentByIndex(index) {
      return this.environments[index];
    },
    getEnvironment(flatname) {
      return this.environments.find((el) => el.name === flatname);
    },
    setEnvironment(newEnvironment) {
      const index = this.environments.findIndex((el) => el.name === newEnvironment.name);
      if (index !== -1) {
        this.environments[index] = newEnvironment;
      } else {
        this.environments.push(newEnvironment);
      }
    },
    removeEnvironment(flatname) {
      const index = this.environments.findIndex((el) => el.name === flatname);
      if (index !== -1) {
        this.environments.splice(index, 1);
      }
    },
    isEnvironments() {
      return this.environments.length > 0;
    }
  };
};
