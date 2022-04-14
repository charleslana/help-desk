enum RequestStatusEnum {
    OPENED = 'Em aberto', PROCESSING = 'Em análise', FINISHED = 'Finalizada'
}

export const handleStatusTag = (action: string) => {
    const keyof = RequestStatusEnum[action as keyof typeof RequestStatusEnum];
    switch (keyof) {
        case RequestStatusEnum.OPENED:
            return 'is-info';
        case RequestStatusEnum.PROCESSING:
            return 'is-success';
        default:
            return 'is-danger';
    }
};

export const handleStatus = (action: string) => {
    const keyof = RequestStatusEnum[action as keyof typeof RequestStatusEnum];
    switch (keyof) {
        case RequestStatusEnum.OPENED:
            return RequestStatusEnum.OPENED;
        case RequestStatusEnum.PROCESSING:
            return RequestStatusEnum.PROCESSING;
        default:
            return RequestStatusEnum.FINISHED;
    }
};

export default RequestStatusEnum;