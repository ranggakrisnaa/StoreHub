export declare class CreateUserDto {
    name: string;
    username: string;
    email: string;
    password: string;
    role: 'USER' | 'ADMIN';
    confirmPassword: string;
}
