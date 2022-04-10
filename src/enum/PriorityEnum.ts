enum PriorityEnum {
    LOW = 'Software não funciona',
    MEDIUM = 'Meu computador parou de funcionar',
    HIGH = 'Internet parou de funcionar',
    CRITICAL = 'Servidor parou de funcionar'
}

export const handlePriorityType = (priority: PriorityEnum) => {
    return Object.keys(PriorityEnum)[Object.values(PriorityEnum).indexOf(priority)];
}

export default PriorityEnum;