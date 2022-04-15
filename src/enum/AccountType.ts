enum AccountType {
    USER = 'Usuário', ADMIN = 'Administrador'
}

export const handleAccountType = (accountType: AccountType) => {
    return Object.keys(AccountType)[Object.values(AccountType).indexOf(accountType)];
}

export const handleAccount = (action: string) => {
    const keyof = AccountType[action as keyof typeof AccountType];
    switch (keyof) {
        case AccountType.USER:
            return AccountType.USER;
        case AccountType.ADMIN:
            return AccountType.ADMIN;
        default:
            return AccountType.USER;
    }
};

export default AccountType;