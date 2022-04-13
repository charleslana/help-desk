class LocalStorageUtils {
    private static storageToken = 'token';
    private static storageAccountType = 'accountType';
    private static storageName = 'name';
    private static storageEmail = 'email';

    public static getToken() {
        return localStorage.getItem(this.storageToken);
    }

    public static getAccountType() {
        return localStorage.getItem(this.storageAccountType);
    }

    public static getName() {
        return localStorage.getItem(this.storageName);
    }

    public static getEmail() {
        return localStorage.getItem(this.storageEmail);
    }

    public static setToken(string: string) {
        return localStorage.setItem(this.storageToken, string);
    }

    public static setAccountType(string: string) {
        return localStorage.setItem(this.storageAccountType, string);
    }

    public static setName(string: string) {
        return localStorage.setItem(this.storageName, string);
    }

    public static setEmail(string: string) {
        return localStorage.setItem(this.storageEmail, string);
    }

    public static logout() {
        if (this.getToken()) {
            localStorage.removeItem(this.storageToken);
        }
        if (this.getAccountType()) {
            localStorage.removeItem(this.storageAccountType);
        }
        if (this.getName()) {
            localStorage.removeItem(this.storageName);
        }
        if (this.getEmail()) {
            localStorage.removeItem(this.storageEmail);
        }
    }
}

export default LocalStorageUtils;