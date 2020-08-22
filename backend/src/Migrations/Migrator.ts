export interface Migrator {
    migrate(): Promise<void>;
}
