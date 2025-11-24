

export interface YouTubeDataType {
    username: string;
    email: string;
    channel: string;
    social: {
        twitter: string;
        instagram: string;
    };
    phoneNumbers: string[];
    numbers: {
        number: string;
    }[];
    age: number;
    dateOfBirth: Date
}

export interface LoginData {
    email: string;
    password: string;
}