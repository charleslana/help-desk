enum UserStatusEnum {
    ACTIVE = 'Ativo', INACTIVE = 'Inativo'
}

export const handleUserStatus = (status: UserStatusEnum) => {
    return Object.keys(UserStatusEnum)[Object.values(UserStatusEnum).indexOf(status)];
}

export const handleUser = (action: string) => {
    const keyof = UserStatusEnum[action as keyof typeof UserStatusEnum];
    switch (keyof) {
        case UserStatusEnum.ACTIVE:
            return UserStatusEnum.ACTIVE;
        case UserStatusEnum.INACTIVE:
            return UserStatusEnum.INACTIVE;
        default:
            return UserStatusEnum.INACTIVE;
    }
};

export default UserStatusEnum;