interface ErrorDetails {
    statusCode: number; 
    message: string; 
    body: { msg: string };
}

interface BootstrapError {
    details: ErrorDetails; 
    status: number;
    message: string;
}


export class ExpressBootstrapError implements BootstrapError {
    constructor(
      private readonly errDetails: string
    ) {

        this.details = {
            statusCode: this.status, 
            message: this.message, 
            body: {msg: this.errDetails}
        }
    }

    readonly status = 500;
    readonly message = 'Failed to bootstrap Express.';
}