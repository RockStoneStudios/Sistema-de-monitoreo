import { EmailService } from "../../../presentation/email/email.service";
import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from '../../repository/log.repository';



interface SendLogEmailUseCase {
    execute: (to:string | string[]) => Promise<boolean>;
}



export class SendEmailLogs implements SendLogEmailUseCase{

    constructor(
        private readonly emailService : EmailService,
        private readonly LogRepository : LogRepository
    ) {}
    async execute (to: string | string[]){
          try{
           const sent = await  this.emailService.sendEmailWithFilesLogs(to);
               if(!sent) {
                throw new Error('Email log not sent');
               }
               const log = new LogEntity({
                message : `Log email sent`,
                level : LogSeverityLevel.low,
                origin : 'Send-email-logs.ts'
            })
            this.LogRepository.saveLog(log);
            return true;
            }catch(error){
             const log = new LogEntity({
                 message : `${error}`,
                 level : LogSeverityLevel.hight,
                 origin : 'Send-email-logs.ts'
             })
             this.LogRepository.saveLog(log);
             return false;
          }
          return true;
    }

}