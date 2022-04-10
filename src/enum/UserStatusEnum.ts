enum UserStatusEnum {
    ACTIVE = 'Ativo', INACTIVE = 'Inativo'
}

export const handleUserStatus = (status: UserStatusEnum) => {
    return Object.keys(UserStatusEnum)[Object.values(UserStatusEnum).indexOf(status)];
}

export default UserStatusEnum;