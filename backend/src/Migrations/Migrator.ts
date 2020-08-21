interface Migrator {
    migrate(): Promise<void>
}