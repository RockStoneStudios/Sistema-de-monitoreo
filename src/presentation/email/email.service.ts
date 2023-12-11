import nodemailer from 'nodemailer';
import { envs } from '../../config/plugin/envs.plugin';
import { LogRepository } from '../../domain/repository/log.repository';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';


interface SendMailOptions {
    to :string | string[];
    subject : string;
    htmlBody : string;
    attachements? : Attachements[]
}


interface Attachements {
    filename : string;
    path     : string;
}

export class EmailService {
    private transporter = nodemailer.createTransport({
        service : envs.MAILER_SERVICE,
        auth : {
            user : envs.MAILER_EMAIL,
            pass : envs.MAILER_SECRET_KEY
        }
    });

    constructor(
       
    ){}

    async sendEmail(options : SendMailOptions):Promise<boolean>{
       const {to,subject,htmlBody,attachements=[]} = options;
        try{
           const sentInformation = await this.transporter.sendMail({
             to:to,
             subject,
             html : htmlBody,
             attachments : attachements
           });
          
           return true;
        }catch(error){
            
             
            return false;
        }
    }

   async  sendEmailWithFilesLogs(to:string | string[]){
     
        const subject = 'Logs del servidor';
        const htmlBody = `
        <h2>Logs de sistema</h2>
        <p>Lorem ipsum dolor sit amet, 
        consectetur adipiscing elit, sed do eiusmod tempor incididunt
         ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
         exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
         ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
         exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
         ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
         exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
         
         </p>
         <h4> Ver los adjuntos </h4>
        
        `;

        const attachements : Attachements[] =[
            {filename : 'logs-all.log', path:'./logs/logs-all.log'},
            {filename : 'logs-medium.log', path:'./logs/logs-medium.log'},
            {filename : 'logs-high.log', path:'./logs/logs-high.log'}
        ]

           return  this.sendEmail({
            to,
            subject ,
            htmlBody,
            attachements : attachements
        });
        
       
        
    }
}

