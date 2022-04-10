enum AccountType {
    USER = 'Usuário', ADMIN = 'Administrador'
}

export const handleAccountType = (accountType: AccountType) => {
    return Object.keys(AccountType)[Object.values(AccountType).indexOf(accountType)];
}

export default AccountType;