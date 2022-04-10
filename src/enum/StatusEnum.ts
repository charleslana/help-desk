enum StatusEnum {
    OPENED = 'Em aberto', PROCESSING = 'Em análise', FINISHED = 'Finalizada'
}

export const handleStatusTag = (action: StatusEnum) => {
    switch (action) {
        case StatusEnum.OPENED:
            return 'is-info';
        case StatusEnum.PROCESSING:
            return 'is-success';
        default:
            return 'is-danger';
    }
};

export default StatusEnum;