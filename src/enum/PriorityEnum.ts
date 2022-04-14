enum PriorityEnum {
    LOW = 'Software não funciona',
    MEDIUM = 'Meu computador parou de funcionar',
    HIGH = 'Internet parou de funcionar',
    CRITICAL = 'Servidor parou de funcionar'
}

export const handlePriorityType = (priority: PriorityEnum) => {
    return Object.keys(PriorityEnum)[Object.values(PriorityEnum).indexOf(priority)];
}

export const handlePriority = (priority: string) => {
    const keyof = PriorityEnum[priority as keyof typeof PriorityEnum];
    switch (keyof) {
        case PriorityEnum.LOW:
            return PriorityEnum.LOW;
        case PriorityEnum.MEDIUM:
            return PriorityEnum.MEDIUM;
        case PriorityEnum.HIGH:
            return PriorityEnum.HIGH;
        default:
            return PriorityEnum.CRITICAL;
    }
};

export default PriorityEnum;