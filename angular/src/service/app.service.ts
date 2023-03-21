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

    executeGetCpuStats() {
        var loadUrl = 'http://localhost:5000/get-cpu-stats'
        return this.http.get<any>(loadUrl).toPromise()
    }

    executeGetMemStats() {
        var loadUrl = 'http://localhost:5000/get-mem-stats'
        return this.http.get<any>(loadUrl).toPromise()
    }

    async executeLoadService(files : any) {
        var outputUncompressed = { time: 0, size: 0}
        var outputChimp = { time: 0, size: 0}
        var outputPatas = { time: 0, size: 0}
        
        var loadUrl = 'http://localhost:5000/load?algorithm=uncompressed&filenames=' + files.selectedFiles.join(",")
        console.log(loadUrl)
        outputUncompressed = await this.http.get<any>(loadUrl).toPromise()
        
        loadUrl = 'http://localhost:5000/load?algorithm=chimp&filenames=' + files.selectedFiles.join(",")
        console.log(loadUrl)
        outputChimp = await this.http.get<any>(loadUrl).toPromise()
        
        loadUrl = 'http://localhost:5000/load?algorithm=patas&filenames=' + files.selectedFiles.join(",")
        console.log(loadUrl)
        outputPatas = await this.http.get<any>(loadUrl).toPromise()
        console.log(outputUncompressed)
        console.log(outputChimp)
        console.log(outputPatas)
        return {
            "uncompressed": outputUncompressed,
            "chimp": outputChimp,
            "patas": outputPatas
        }
        
    }

    async executeLoadUncompressedService(files : any) {
        var output = { time: 0, size: 0}        
        var loadUrl = 'http://localhost:5000/load?algorithm=uncompressed&filenames=' + files.selectedFiles.join(",")
        console.log(loadUrl)
        output = await this.http.get<any>(loadUrl).toPromise()
        return output
    }

    async executeLoadChimpService(files : any) {
        var output = { time: 0, size: 0}        
        var loadUrl = 'http://localhost:5001/load?algorithm=chimp&filenames=' + files.selectedFiles.join(",")
        console.log(loadUrl)
        output = await this.http.get<any>(loadUrl).toPromise()
        return output
    }

    async executeLoadPatasService(files : any) {
        var output = { time: 0, size: 0}        
        var loadUrl = 'http://localhost:5002/load?algorithm=patas&filenames=' + files.selectedFiles.join(",")
        console.log(loadUrl)
        output = await this.http.get<any>(loadUrl).toPromise()
        return output
    }

    async head(file : any) {
        var output = { lines: ""}        
        var loadUrl = 'http://localhost:5000/head?filename=' + file
        console.log(loadUrl)
        output = await this.http.get<any>(loadUrl).toPromise()
        return output
    }

    async resetStats() {
        var output = { result: true}
        var url = 'http://localhost:5000/reset-stats'
        console.log(url)
        output = await this.http.get<any>(url).toPromise()
        return output
    }
    
    async saveFig() {
        var output = { result: true}
        var url = 'http://localhost:5000/save-fig'
        console.log(url)
        output = await this.http.get<any>(url).toPromise()
        return output
    }

    async executeQueryUncompressedService(query : any) {
        var output = { time: 0, size: 0, error: ""}
        var url = 'http://localhost:5000/exact-query?algorithm=uncompressed&query=' + query
        console.log(url)
        output = await this.http.get<any>(url).toPromise()
        return output
    }

    async executeQueryChimpService(query : any) {
        var output = { time: 0, size: 0, error: ""}        
        var url = 'http://localhost:5001/exact-query?algorithm=chimp&query=' + query
        console.log(url)
        output = await this.http.get<any>(url).toPromise()
        return output
    }

    async executeQueryPatasService(query : any) {
        var output = { time: 0, size: 0, error: ""}        
        var url = 'http://localhost:5002/exact-query?algorithm=patas&query=' + query
        console.log(url)
        output = await this.http.get<any>(url).toPromise()
        return output
    }


}