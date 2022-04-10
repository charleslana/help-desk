enum RequestStatusEnum {
    OPENED = 'Em aberto', PROCESSING = 'Em análise', FINISHED = 'Finalizada'
}

export const handleStatusTag = (action: RequestStatusEnum) => {
    switch (action) {
        case RequestStatusEnum.OPENED:
            return 'is-info';
        case RequestStatusEnum.PROCESSING:
            return 'is-success';
        default:
            return 'is-danger';
    }
};

export default RequestStatusEnum;