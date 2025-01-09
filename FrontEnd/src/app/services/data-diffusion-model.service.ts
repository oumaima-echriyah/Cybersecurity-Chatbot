import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataDiffusionModelService {

  private apiUrl = 'http://127.0.0.1:5000/predict'; // Remplacez par l'URL de votre API Flask

  constructor(private http: HttpClient) {}

  // Méthode pour envoyer le fichier JSON et recevoir une réponse
  analyzeJsonFile(formData: FormData): Observable<any> {
    return this.http.post<any>(this.apiUrl, formData);
  }
}