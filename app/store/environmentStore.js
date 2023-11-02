import { ref, set, child, push, update, get } from "firebase/database";
import { database } from "../../firebaseConfig";
import firebase from 'firebase/compat/app';


export const createEnvironmentStore = () => {
  return {
    environments: [],

    // LOAD ENVIRONMENTS AT APP STARTUP 
    loadEnvironments() {
      const dbRef = ref(database);
      const userId = firebase.auth().currentUser.uid;
      get(child(dbRef, `/users/user-${userId}`)).then((snapshot) => {
        if (snapshot.exists()) {
          const envId = snapshot.val();
          get(child(dbRef, `/environments/${envId}`)).then((res) => {
            if(res.exists()) {
              this.environments.push(res.val())
            } else {
              console.log("Wrong environment key.")
            }
          })
          .catch((error) => { 
            console.error(error);
          });
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
        updates['/users/user-' + firebase.auth().currentUser.uid + '/'] = newEnvKey;

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
