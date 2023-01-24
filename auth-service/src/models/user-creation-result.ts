export default interface UserCreationResult {
    status: StatusEnum;
    username: string;
    message: string;
}

export enum StatusEnum {
    SUCCESS = 'success',
    ERROR = 'error'
}