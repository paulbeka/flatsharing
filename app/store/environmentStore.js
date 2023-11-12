import { ref, set, child, push, update, get } from "firebase/database";
import { database } from "../../firebaseConfig";
import firebase from 'firebase/compat/app';
import { runInAction } from "mobx";


// TODO: Store the environment ID so it does not need to be fetched every time
export const createEnvironmentStore = () => {
  return {
    environments: [null],

    // LOAD ENVIRONMENTS AT APP STARTUP 
    loadEnvironments() {
      const dbRef = ref(database);
      const userId = firebase.auth().currentUser.uid;
      get(child(dbRef, `/users/user-${userId}`)).then((snapshot) => {
        if (snapshot.exists()) {
          const envId = snapshot.val();
          get(child(dbRef, `/environments/${envId}`)).then((res) => {
            if(res.exists()) {
              runInAction(() => {
                this.environments.splice(0, 1); // delete the null value
                this.environments.push({...res.val(), envId: envId})
              })
            } else {
              console.log("Wrong environment key.")
            }
          })
          .catch((error) => { 
            this.environments.splice(0, 1);
            console.error(error);
          });
        } else {
          this.environments.splice(0, 1); 
        }
      }).catch((error) => { 
        console.error(error);
      });
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
        const dbRef = ref(database);
        const userId = firebase.auth().currentUser.uid;
        get(child(dbRef, `/users/user-${userId}`)).then((snapshot) => {
          if (snapshot.exists()) {
            const envId = snapshot.val();

            const updates = {};
            updates['/environments/' + envId] = newEnvironment;
            updates['/users/user-' + firebase.auth().currentUser.uid + '/'] = envId;

            update(ref(database), updates);
          } else {
            const newEnvKey = push(child(ref(database), '/environments/')).key;

            const updates = {};
            updates['/users/user-' + firebase.auth().currentUser.uid + '/'] = newEnvKey;

            update(ref(database), updates);
          }
          this.removeEnvironment(this.getEnvironment(newEnvironment))
          this.environments.push(newEnvironment);
        })
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
