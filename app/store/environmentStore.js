export const createEnvironmentStore = () => {
  return {
    environments: [],
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
    isEnvironments() {
      return this.environments.length > 0;
    }
  };
};
