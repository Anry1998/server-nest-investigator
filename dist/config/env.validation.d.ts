declare class EnvironmentVariables {
    APP_PORT: number;
    DB_PASSWORD: string;
    DB_USERNAME: string;
    DB_NAME: string;
    DB_PORT: number;
    DB_HOST: string;
    DB_LOGGING: boolean;
    DB_SYNCHRONIZATION: boolean;
}
export declare function validate(config: Record<string, unknown>): EnvironmentVariables;
export {};
