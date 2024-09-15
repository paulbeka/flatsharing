import { ref, child, push, update, get } from "firebase/database";
import { database } from "../../firebaseConfig";
import firebase from 'firebase/compat/app';
import { runInAction } from "mobx";
import { getLocales } from 'expo-localization';


// TODO: Store the environment ID so it does not need to be fetched every time
export const createEnvironmentStore = () => {
  return {
    environments: null,
    userData: {
      username: "GenericUser",
      language: getLocales()[0].languageCode
    },
    language: null,

    setUsername(username) {
      this.userData.username = username;
    },

    loadLanguage() {
      if(this.userData["language"] === "en") {
        import('../../assets/languages/english')
        .then((language) => {
          runInAction(() => {
            this.language = language.text
          })
        });
      } else if(this.userData["language"] === "fr") {
        import('../../assets/languages/french')
        .then((language) => {
          runInAction(() => {
            this.language = language.text
          })
        })
      }
    },

    // LOAD ENVIRONMENTS AT APP STARTUP 
    loadEnvironments() {
      const dbRef = ref(database);
      const userId = firebase.auth().currentUser.uid;
      get(child(dbRef, `/users/user-${userId}`)).then((snapshot) => {
        if (snapshot.exists()) {
          const envId = Object.keys(snapshot.val())[0];
          // TODO: when these tasks are fetched, make sure to check that there has been no change in timing
          get(child(dbRef, `/environments/${envId}`)).then((res) => {
            if(res.exists()) {
              runInAction(() => {
                this.environments = {...res.val(), envId: envId}
                // here handle the change in time 
                // if there is a change where the time is set to be earlier, don't reshuffle
                // and just make it the next persons's task
              })
            } else {
              this.environments = undefined;  // there is no assosiated environment
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

    getUserData() {
      return this.userData
    },

    setEnvironment(newEnvironment) {
      const dbRef = ref(database);
      const userId = firebase.auth().currentUser.uid;
      console.log(`/users/user-${userId}`);

      get(child(dbRef, `/users/user-${userId}`)).then((snapshot) => {
        if(snapshot.exists()) {
          const envId = Object.keys(snapshot.val())[0];

          const updates = {};
          updates['/environments/' + envId] = newEnvironment;

          update(ref(database), updates);
        } else {
          const newEnvKey = push(child(ref(database), '/environments/')).key;
          this.environments = newEnvironment
          this.environments.envId = newEnvKey;

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
      const dbRef = ref(database);
      get(child(dbRef, `/environments/${code}`)).then((res) => {
        if(res.exists()) {
          runInAction(() => {
            this.environments = res.val()

            const updates = {};
            const path = '/users/user-' + firebase.auth().currentUser.uid + '/' + code
            updates[path] = {
              "username": this.userData["username"]
            };
      
            update(ref(database), updates);
          })
        } else {
          console.log("Wrong environment key.")
        }
      })
      .catch((error) => { 
        console.error(error);
        this.environments = undefined;
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
