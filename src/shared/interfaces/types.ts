export interface User {
    _id:string | undefined;
    email: string;
    username: string;
    authentication?: {
        salt: string | null | undefined;
        password: string | null | undefined;
        sessionToken:string | null | undefined;
        // Define other authentication properties here if needed
    }
    // Define other user properties here if needed
}