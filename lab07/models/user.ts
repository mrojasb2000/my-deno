import  db  from './db.ts'; 

interface User {
    email: string,
    password: string
}

class UserClass {
    constructor(){}
    userCollection = db.collection('users');
    createUser = async (inputUserDetails: User) => {
        const newUser = await this.userCollection.insertOne(inputUserDetails);
        return;
    }
}

export default UserClass;

/* const detailsCollection = db.collection('details');

const deleteMany = await detailsCollection.deleteMany({username: "NEW Updated Many Username"});
 */