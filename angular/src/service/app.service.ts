import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageModel } from '../model/Message';

@Injectable({
    providedIn: 'root'
})
export class AppService {

    constructor(private http: HttpClient) {
    }

    executeRootService() {
        return this.http.get<MessageModel>('http://localhost:5500/')
    }

    async executeLoadService(files : any, error : any) {
        var output = { uncompressed: 0, simpiece: 0}
       
        var url = 'http://localhost:5500/load?error=' + error + '&filenames=' + files.selectedFiles.join(",")
        console.log(url)
        output = await this.http.get<any>(url).toPromise()
        
        console.log(output)
        return {
            "uncompressed": output.uncompressed,
            "simpiece": output.simpiece
        }
        
    }

    async executeSelectService(files : any, error : any) {    
        var url = 'http://localhost:5500/select?error=' + error + '&filenames=' + files.selectedFiles.join(",")
        console.log(url)
        var output = await this.http.get<any>(url).toPromise()
        
        console.log(output)
        return output
        
    }

    async executeForecastService(files : any, error : any) {    
        var url = 'http://localhost:5500/forecast?error=' + error + '&filenames=' + files.selectedFiles.join(",")
        console.log(url)
        var output = await this.http.get<any>(url).toPromise()
        
        console.log(output)
        return output
        
    }

    async head(file : any) {
        var output = { lines: ""}        
        var url = 'http://localhost:5000/head?filename=' + file
        console.log(url)
        output = await this.http.get<any>(url).toPromise()
        return output
    }

}