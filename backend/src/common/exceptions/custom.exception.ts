export class CustomException extends Error {
    public readonly statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);
        this.name = 'CustomException';
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, new.target.prototype);
    }
}

export class NotFoundException extends CustomException {
    constructor(message: string = 'Resource not found') {
        super(message, 404);
        this.name = 'NotFoundException';
    }
}

export class BadRequestException extends CustomException {
    constructor(message: string = 'Bad request') {
        super(message, 400);
        this.name = 'BadRequestException';
    }
}

export class InputBadRequestException extends BadRequestException {
    constructor(message: string = 'Invalid input') {
        super(message);
        this.name = 'InputBadRequestException';
    }
}

export class AlreadyException extends CustomException {
    constructor(message: string = 'Resource already exists') {
        super(message, 408);
        this.name = 'AlreadyException';
    }
}

export class ConflictException extends CustomException {
    constructor(message: string = 'Resource already exists') {
        super(message, 409);
        this.name = 'ConflictException';
    }
}

export class UnauthorizedException extends CustomException {
    constructor(message: string = 'Unauthorized') {
        super(message, 401);
        this.name = 'UnauthorizedException';
    }
}

export class InternalServerException extends CustomException {
    constructor(message: string = 'Internal server error') {
        super(message, 500);
        this.name = 'InternalServerException';
    }
}
