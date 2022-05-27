export function createControl(config, validation) {
    return {
        ...config,
        validation,
        valid: false,
        touched: false,
        value: ''
    }
}