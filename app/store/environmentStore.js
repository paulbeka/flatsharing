import { ref, set, child, push, update, get } from "firebase/database";
import { database } from "../../firebaseConfig";
import firebase from 'firebase/compat/app';
import { runInAction } from "mobx";


// TODO: Store the environment ID so it does not need to be fetched every time
export const createEnvironmentStore = () => {
  return {
    environments: null,
    userData: {
      username: "GenericUser"
    },

    // LOAD ENVIRONMENTS AT APP STARTUP 
    loadEnvironments() {
      const dbRef = ref(database);
      const userId = firebase.auth().currentUser.uid;
      get(child(dbRef, `/users/user-${userId}`)).then((snapshot) => {
        if (snapshot.exists()) {
          const envId = Object.keys(snapshot.val())[0];
          get(child(dbRef, `/environments/${envId}`)).then((res) => {
            if(res.exists()) {
              runInAction(() => {
                this.environments = {...res.val(), envId: envId}
              })
            } else {
              console.log("Wrong environment key.")
            }
          })
          .catch((error) => { 
            this.environments = undefined
            console.error(error);
          });
        } else {
          this.environments = undefined
        }
      }).catch((error) => { 
        console.error(error);
      });
    },

    // Load the name of the user for environments and such
    loadUserData() {

    },

    getEnvironment() {
      return this.environments;
    },

    setEnvironment(newEnvironment) {
      const dbRef = ref(database);
      const userId = firebase.auth().currentUser.uid;
      get(child(dbRef, `/users/user-${userId}`)).then((snapshot) => {
        if (snapshot.exists()) {
          const envId = Object.keys(snapshot.val())[0];

          const updates = {};
          updates['/environments/' + envId] = newEnvironment;

          update(ref(database), updates);
        } else {
          const newEnvKey = push(child(ref(database), '/environments/')).key;

          const updates = {};
          const path = '/users/user-' + firebase.auth().currentUser.uid + '/' + newEnvKey
          
          updates['/environments/' + newEnvKey] = newEnvironment;
          updates[path] = {
            "username": this.userData["username"]
          };

          update(ref(database), updates);
        }
        this.environments = newEnvironment;
      })
    },

    joinEnvironment(code) {
      this.environments = null;
      const dbRef = ref(database);
      get(child(dbRef, `/environments/${code}`)).then((res) => {
        if(res.exists()) {
          runInAction(() => {
            this.environments = {...res.val(), envId: code}

            const updates = {};
            updates['/users/user-' + firebase.auth().currentUser.uid + '/'] = code;
      
            update(ref(database), updates);
          })
        } else {
          console.log("Wrong environment key.")
        }
      })
      .catch((error) => { 
        this.environments = undefined;
        console.error(error);
      });
    },

    removeEnvironment(flatname) {
        this.environments = undefined;
    },

    emptyEnvironments() {
      this.environments = null;
    },

    isEnvironments() {
      return this.environments !== null && this.environments !== undefined;
    }
  };
};
