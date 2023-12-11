import { CronJob } from 'cron';
import { CronService } from './cron/cron-service';
import { CheckService } from '../domain/use-cases/checks/check-service';
import { LogRepositoryImpl } from '../infrastructure/repositories/log.repository';
import { FileSystemDatasource } from '../infrastructure/datasources/file-system.datasource';
import { EmailService } from './email/email.service';
import { SendEmailLogs } from '../domain/use-cases/email/send-email-logs';
import { MongoLogDatasource } from '../infrastructure/datasources/mongo-log.datasource';
import { PostgresLogDatasource } from '../infrastructure/datasources/postgres-log.datasource';
import { CheckServiceMultiple } from '../domain/use-cases/checks/check-services-multiple';


// const fileSystemLogRepository = new LogRepositoryImpl(
//   
// )

// new MongoLogDatasource()


const fsLogRepository = new LogRepositoryImpl(
   new FileSystemDatasource()
   
)

const mongoLogRepository = new LogRepositoryImpl(
   new MongoLogDatasource()
)

const postgresLogRepository = new LogRepositoryImpl(
   new PostgresLogDatasource()
)




const emailService = new EmailService();

export class Server {
   static start(){
      console.log('Starting Server . . .');

   //    //enviar email 
   //   new SendEmailLogs(emailService,fileSystemLogRepository).execute(['rockstonestudios666@gmail.com','neggocastano@gmail.com'])
     

     CronService.createJob(
     
        '*/3 * * * * *',()=>{
            const url = 'https://google.com';
           new CheckServiceMultiple(
              [fsLogRepository,mongoLogRepository,postgresLogRepository],
            () => console.log(`${url} is Ok`),
            (error) => console.log(error)
           ).execute(url)
        
        }
        
        );
   }
}