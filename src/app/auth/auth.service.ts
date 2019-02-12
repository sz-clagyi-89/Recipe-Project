import * as firebase from 'firebase/app';
import 'firebase/auth';

export class AuthService {
    signup(email: string, password: string) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .catch(error => console.log(error));
    }
}
