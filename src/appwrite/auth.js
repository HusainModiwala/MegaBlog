import config from "../config/config";
import {Client, Account,ID} from 'appwrite';

class AuthService {
    client;
    account;

    constructor(){
        this.client = new Client();
        this.client.setEndpoint(config.appwriteUrl).setProject(config.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({name, email, password}){
        try {
            let userAccount = await this.account.create(ID.unique(), email, password, name);
            if(userAccount){
                //call login
                await this.login({email, password});
            }
            return null;
        } catch (error) {
            throw error;
        }
    }

    async login({email, password}){
        try {
            return await this.account.createEmailSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser(){
        try {
           return await this.account.get(); 
        } catch (error) {
            throw error;
        }
    }

    async logout(){
        try {
            await this.account.deleteSessions();
        } catch (error) {
            throw error;
        }
    }
}

const authService = new AuthService();

export default authService;