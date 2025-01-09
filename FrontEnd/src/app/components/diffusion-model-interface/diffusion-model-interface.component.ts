import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { DataDiffusionModelService } from '../../services/data-diffusion-model.service'; // Chemin correct selon votre structure

@Component({
  selector: 'app-diffusion-model-interface',
  templateUrl: './diffusion-model-interface.component.html',
  styleUrls: ['./diffusion-model-interface.component.css'],
})
export class DiffusionModelInterfaceComponent {
  @Output() closePopup = new EventEmitter<void>();

  @ViewChild('fileInput', { static: false }) fileInput: any; // Référence à l'élément input de type file

  uploadedFiles: { name: string; type: string; progress: number; error?: boolean, content?: any }[] = []; // Ajout du champ "content" pour stocker le contenu du fichier
  alertClass: number = 2;  // 0 pour succès, 1 pour erreur
  alertMessage: string = '';  // Message de l'alerte
  // Méthode pour fermer le popup
  onClosePopup(): void {
    this.closePopup.emit();
  }

  simulateUploadProgress(fileObj: { name: string; type: string; progress: number; error?: boolean }): void {
    const interval = setInterval(() => {
      if (fileObj.progress < 100) {
        fileObj.progress += 10; // Augmente la progression par 10%
      } else {
        clearInterval(interval); // Arrête une fois que la progression atteint 100%
        console.log(`File uploaded successfully: ${fileObj.name}`);
      }
    }, 500); // Intervalle de 500 ms
  }

  onFileSelect(event: any): void {
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileObj = {
        name: file.name,
        type: file.type,
        progress: 0,
        error: false,
      };
      this.uploadedFiles.push(fileObj);
      this.simulateUploadProgress(fileObj); // Simule la progression
    }
  }

  deleteFile(index: number): void {
    this.uploadedFiles.splice(index, 1);

    if (this.fileInput) {
      this.fileInput.nativeElement.value = ''; // Réinitialise le champ input
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  onFileDrop(event: DragEvent): void {
    event.preventDefault();
    const files = event.dataTransfer?.files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        this.uploadedFiles.push({
          name: files[i].name,
          type: files[i].type,
          progress: 100,
          error: false,
        });
      }
    }
  }
  constructor(private dataService: DataDiffusionModelService) {}

// Méthode pour lire le contenu JSON et envoyer à Flask
readJsonContent(index: number): void {
  const fileObj = this.uploadedFiles[index];

  if (fileObj.type === 'application/json') {
    const files = this.fileInput.nativeElement.files;

    if (files && files[index]) {
      const file = files[index];

      // Lire le contenu du fichier JSON
      const reader = new FileReader();
      reader.onload = (event: any) => {
        try {
          // Convertir le contenu du fichier en objet JSON
          const jsonContent = JSON.parse(event.target.result);

          // Vérifier que la clé "features" existe
          if (!jsonContent.features) {
            this.alertClass = 1; // Erreur
            this.alertMessage = 'Le fichier JSON ne contient pas la clé "features".';
            console.error('Clé "features" manquante dans le fichier JSON.');
            return;
          }

          // Appel au service Flask pour envoyer les données
          this.dataService.analyzeJsonFile(jsonContent).subscribe(
            (response) => {
              console.log('Réponse de Flask:', response);
              if (response.predicted_class === 1) {
                this.alertClass = 1; // Erreur (attaque détectée)
                this.alertMessage = 'Attack detected.';
              } else {
                this.alertClass = 0; // Succès (sûr)
                this.alertMessage = ' Safe.';
              }
            },
            (error) => {
              console.error('Erreur lors de l\'appel à l\'API Flask:', error);
              this.alertClass = 1; // Erreur
              this.alertMessage = 'Erreur lors de l\'analyse du fichier.';
            }
          );
        } catch (e) {
          console.error('Erreur lors de la lecture ou de l\'analyse du fichier JSON:', e);
          this.alertClass = 1; // Erreur
          this.alertMessage = 'Le fichier JSON est invalide.';
        }
      };

      reader.readAsText(file); // Lire le fichier en tant que texte
    } else {
      console.error("Impossible de trouver le fichier pour l'index donné.");
      this.alertClass = 1; // Erreur
      this.alertMessage = 'Fichier non trouvé.';
    }
  } else {
    console.warn(`Le fichier sélectionné (${fileObj.name}) n'est pas un fichier JSON.`);
    this.alertClass = 1; // Erreur
    this.alertMessage = 'Le fichier n\'est pas un fichier JSON valide.';
  }
}

}


