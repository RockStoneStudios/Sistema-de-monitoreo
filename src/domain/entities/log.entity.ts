


export enum LogSeverityLevel{
    low     = 'low',
    medium  = 'medium',
    hight   = 'high',
}

export interface LogEntityOptions {
    message   : string;
    level     : LogSeverityLevel;
    createdAt? : Date;
    origin    : string;
}
export class LogEntity {
    public message : string;
    public level : LogSeverityLevel;
    public createdAt : Date;
    public origin : string;

    constructor(options:LogEntityOptions) {
          const {message,level,origin,createdAt = new Date()} = options
          this.message = message;
          this.level = level;
          this.createdAt = new Date();
          this.origin = origin
    }

    static fromJson = (json:string ) : LogEntity => {
        json = (json === '') ? '{}':json;
        const {message,level,createdAt,origin} =  JSON.parse(json);
       
        const log = new LogEntity({message,level,createdAt,origin});
        
        return log;
    }

    static fromObject = (object: {[key : string]:any}) : LogEntity => {
        const {message, level,createdAt,origin} = object;
        const log = new LogEntity({
            message,level,createdAt,origin
        });

        return log;
    }
}