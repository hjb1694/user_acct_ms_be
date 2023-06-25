import winston from 'npm:winston';

export const logger = new (winston.createLogger as any)({
    transports: [
        new winston.transports.Console(), 
        new winston.transports.File({
            filename: './logs/combined.log', 
            level: 'info'
        }), 
        new winston.transports.File({
            filename: './logs/warn.log', 
            level: 'warn'
        }), 
        new winston.transports.File({
            filename: './logs/error.log', 
            level: 'error'
        })
    ]
});