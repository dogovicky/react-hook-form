

export interface YouTubeDataType {
    username: string;
    email: string;
    channel: string;
    social: {
        twitter: string;
        instagram: string;
    };
    phoneNumbers: string[];
}

export interface LoginData {
    email: string;
    password: string;
}