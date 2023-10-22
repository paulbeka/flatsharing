export const createEnvironmentStore = () => {
  return {
    environments: [{
      "name" : "Flat1"
    }],
    addEnvironment(environment) {
      this.environments.push(environment)
    },
    getEnvironment(index) {
      return this.environments[index]
    },
    isEnvironments() {
      return this.environments.length > 0
    }
  }
}