const { initializeApp } = require('firebase/app');
const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } = require('firebase/auth');
// Initialize the Firebase app with your configuration
const firebaseConfig = {
    apiKey: "AIzaSyChmE5AE-VDXeAASYHGMQazv9nLyBUgbMc",
    authDomain: "melo-app-f2a3c.firebaseapp.com",
    projectId: "melo-app-f2a3c",
    storageBucket: "melo-app-f2a3c.appspot.com",
    messagingSenderId: "405312796085",
    appId: "1:405312796085:web:854b55924ed9b90526d5fc",
    measurementId: "G-900WD6SM02"
};

initializeApp(firebaseConfig);
const auth = getAuth();
// Example tests for Firebase authentication
describe('Firebase Authentication', () => {
    let testUser;

    beforeAll(async () => {
        // Create a test user before running the tests
        testUser = await createUserWithEmailAndPassword(auth, 'test@example.com', 'password123');
    });

    afterAll(async () => {
        // Delete the test user after running the tests
        await testUser.user.delete();
    });

    it('should sign up a new user', async () => {
        // Test user sign up functionality
        const email = 'test2@example.com';
        const password = 'password456';

        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        expect(userCredential.user.email).toBe(email);
    });

    it('should log in an existing user', async () => {
        // Test user login functionality
        const email = 'test@example.com';
        const password = 'password123';

        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        expect(userCredential.user.email).toBe(email);
    });

    it('should fail to log in with an incorrect password', async () => {
        // Test case for incorrect password login
        const email = 'test@example.com';
        const incorrectPassword = 'incorrectpassword';

        await expect(signInWithEmailAndPassword(auth, email, incorrectPassword)).rejects.toThrow();
    });

    it('should log out a user', async () => {
        // Test user log out functionality
        await auth.signOut();

        expect(auth.currentUser).toBeNull();
    });

    it('should delete a user account', async () => {
        // Test user account deletion functionality

        await testUser.user.delete();

        // Attempt to log in with the deleted user's credentials
        await expect(signInWithEmailAndPassword(auth, 'test@example.com', 'password123')).rejects.toThrow();
    });
    
});