import config from "../config/config";
import {Client, Databases, ID, Query, Storage} from 'appwrite';

class Service{
    client = new Client();
    databases;
    storage;

    constructor(){
        this.client.setEndpoint(config.appwriteUrl).setProject(config.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);
    }

    async createPost({title, slug, content, featuredImage, status, userId}){
        try {
            return await this.databases.createDocument(config.appwriteDatabaseId, 
                config.appwriteCollectionId, 
                config.appwriteBucketId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        } catch (error) {
            throw error;
        }
    }

    async updatePost(slug, {title, content, featuredImage, status}){
        try {
            return await this.databases.createDocument(config.appwriteDatabaseId, 
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status                
                }
            )
        } catch (error) {
            throw error;
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(config.appwriteDatabaseId, 
                config.appwriteCollectionId,
                slug
            );
            return true;
        } catch (error) {
            console.log('error', error);
            return false;
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(config.appwriteDatabaseId, 
                config.appwriteCollectionId,
                slug
            );
        } catch (error) {
            console.log('error', error);
            return false;
        }
    }
    
    async getAllPosts(queries=[Query.equal('status', 'active')]){
        try {
            return await this.databases.listDocuments(config.appwriteDatabaseId,
                config.appwriteCollectionId,
                queries
            );
        } catch (error) {
            console.log('error',error);
        }
    }
}

const service = new Service();

export default service;