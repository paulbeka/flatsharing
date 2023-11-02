import { ref, set, child, push, update, get } from "firebase/database";
import { database, auth } from "../../firebaseConfig";
import firebase from 'firebase/compat/app';


export const createEnvironmentStore = () => {
  return {
    environments: [
    //   {
    //   "name": "Test",
    //   "flatmates": ["John", "Jack"],
    //   "tasks": []
    // }
  ],
    loadEnvironments() {
      const dbRef = ref(database);
      const userId = firebase.auth().currentUser.uid;
      get(child(dbRef, `users/user-${userId}`)).then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
        } else {
          console.log("No data available");
        }
      }).catch((error) => { 
        console.error(error);
      });
    },
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
        const newEnvKey = push(child(ref(database), 'environments')).key;
        
        const updates = {};
        updates['/environments/' + newEnvKey] = newEnvironment;
        updates['/user-' + firebase.auth().currentUser.uid + '/'] = newEnvKey;

        this.environments.push(newEnvironment);

        return update(ref(database), updates);
      } else {
        return -1;        
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
