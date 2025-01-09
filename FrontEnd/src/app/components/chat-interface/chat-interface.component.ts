import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';

interface PromptQuestion {
  input: string;
  icon: string;
}

@Component({
  selector: 'app-chat-interface',
  templateUrl: './chat-interface.component.html',
  styleUrls: ['./chat-interface.component.css']
})
export class ChatInterfaceComponent implements OnInit {
  showPopup: boolean = false;
  promptQuestions: PromptQuestion[] = [
    {
      input: "How To Maintain Efffective Cyber Security?",
      icon: "fa-solid fa-wand-magic-sparkles",
    },
    {
      input: "what are the Types of Cyber Security Threats ? ",
      icon: "fa-solid fa-code",
    },
    {
      input: "What are the consequences of cyber attack ? ",
      icon: "fa-solid fa-wand-magic-sparkles",
    },
    {
      input: "What is Phishing and what does a security analyst do ?  ",
      icon: "fa-solid fa-code",
    },
  ];

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit(): void {

    // Hide the popup initially
    const popup = this.el.nativeElement.querySelector('#popup') as HTMLElement;
    if (popup) {
      popup.style.display = 'none';
    }
    const inputArea = this.el.nativeElement.querySelector(".inputArea input") as HTMLInputElement;
    const sendRequest = this.el.nativeElement.querySelector(".fa-paper-plane") as HTMLElement;
    const startContentUI = this.el.nativeElement.querySelector('.startContent ul');

    // upload file



    this.promptQuestions.forEach((data) => {
      const item = this.renderer.createElement('li');
      this.renderer.setProperty(item, 'innerHTML', `
        <div class="promptSuggestion">
          <p>${data.input}</p>
          <div class="icon">
            <i class="${data.icon}"></i>
          </div>
        </div>
      `);

      // Use Renderer2 to handle events
      this.renderer.listen(item, 'click', () => {
        this.getGeminiResponse(data.input, true);
      });

      this.renderer.appendChild(startContentUI, item);
    });

    // Handling sidebar toggle
    const sideNavigation = this.el.nativeElement.querySelector(".sideNavigation") as HTMLElement;
    const sideBarToggle = this.el.nativeElement.querySelector(".fa-bars") as HTMLElement;
    this.renderer.listen(sideBarToggle, 'click', () => {
      sideNavigation.classList.toggle("expandClose");
    });

    // Handling input keyup


    const sendMessageButton = this.el.nativeElement.querySelector("#send-message") as HTMLElement;

    this.renderer.listen(inputArea, 'keyup', (e: KeyboardEvent) => {
      const target = e.target as HTMLInputElement;

      if (target.value.length > 0 && sendMessageButton.style.display === "none") {
        sendRequest.style.display = "inline";
      } else {
        sendRequest.style.display = "none";
      }
    });




    this.renderer.listen(sendRequest, 'click', () => {
      this.getGeminiResponse(inputArea.value, true);
    });





    //upload file

// Upload file event listener
const uploadIcon = this.el.nativeElement.querySelector('#upload-icon') as HTMLElement;
const fileUpload = this.el.nativeElement.querySelector('#file-upload') as HTMLInputElement;
if (uploadIcon && fileUpload) {
      uploadIcon.addEventListener('click', () => {
        fileUpload.click();
      });}


      this.setupFileInputListener();
    // lakhr d on init
  }

// display popup

displayPopup(): void {
  // Get the popup element
  const popup = this.el.nativeElement.querySelector('#popup') as HTMLElement;

  // Check if the popup element exists
  if (popup) {
    popup.style.display = 'block';
    popup.focus(); // Focus on the popup for accessibility

    // Hide the popup after 5 seconds
    setTimeout(() => {
      popup.style.display = 'none';
    }, 5000);
  }
}


// askk

handleSendMessage(appendHistory: boolean): void {
  const inputArea = this.el.nativeElement.querySelector('.inputArea input') as HTMLInputElement;
  const chatHistory = this.el.nativeElement.querySelector('.chatHistory ul') as HTMLElement;
  const results = this.el.nativeElement.querySelector('.results') as HTMLElement;
  const startContent = this.el.nativeElement.querySelector('.startContent') as HTMLElement;
  const chatContent = this.el.nativeElement.querySelector('.chatContent') as HTMLElement;

  const userInput = inputArea.value;
  if (appendHistory) {
    const historyLi = this.renderer.createElement('li');
    this.renderer.listen(historyLi, 'click', () => {
      this.handleSendMessage(false);
    });
    this.renderer.setProperty(historyLi, 'innerHTML', `<i class="fa-regular fa-message"></i>${userInput}`);
    this.renderer.appendChild(chatHistory, historyLi);
  }
  this.renderer.setProperty(results, 'innerHTML', '');
  inputArea.value = '';
  startContent.style.display = 'none';
  chatContent.style.display = 'block';

  const resultTitle = `
    <div class="resultTitle">
      <img src="assets/images/user.png"/>
      <p>${userInput}</p>
    </div>`;

  const resultData = `
    <div class="resultData">
      <img src="assets/images/bot.png"/>
      <div class="loader">
        <div class="animatedBG"></div>
        <div class="animatedBG"></div>
        <div class="animatedBG"></div>
      </div>
    </div>`;

  this.renderer.setProperty(results, 'innerHTML', resultTitle + resultData);

  fetch("http://127.0.0.1:8080/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ question: userInput }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.response) {
        console.log("Réponse de /ask :", data.response);
        const resultDataElement = this.el.nativeElement.querySelector('.results .resultData') as HTMLElement;
        if (resultDataElement) {
          resultDataElement.remove();
        }
        const resultResponse = `
          <div class="resultResponse">
            <img src="assets/images/bot.png"/>
            <p id="typeEffect">${data.response}</p>
          </div>`;
          this.renderer.setProperty(results, 'innerHTML', resultTitle + resultResponse);
        } else if (data.error) {
        console.error("Erreur :", data.error);
      }
    })
    .catch((error) => {
      console.error("Erreur :", error);
    });}


    // show send mssg btn

    showSendMessageButton(): void {
      const sendRequest = this.el.nativeElement.querySelector('.fa-paper-plane') as HTMLElement;
      const sendMessageButton = this.el.nativeElement.querySelector('#send-message') as HTMLElement;

      if (sendRequest) {
        sendRequest.style.display = 'none';
      }

      if (sendMessageButton) {
        sendMessageButton.style.display = 'inline-block';
        this.renderer.listen(sendMessageButton, 'click', () => {
          this.handleSendMessage(true);
        });
      }
    }


    // handle file upload

    handleFileUpload(files: FileList): Promise<void> {
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i]);
      }

      const AIURL = 'http://127.0.0.1:7000/upload';

      return fetch(AIURL, {
        method: 'POST',
        body: formData
      })
        .then(response => response.json())
        .then((data: { message?: string; error?: string }) => {
          if (data.message) {
            this.displayPopup();
            this.showSendMessageButton();
          } else if (data.error) {
            console.error('Error:', data.error);
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }


    setupFileInputListener(): void {
      const fileInput = this.el.nativeElement.querySelector('#file-upload') as HTMLInputElement;

      if (fileInput) {
        this.renderer.listen(fileInput, 'change', (event: Event) => {
          const target = event.target as HTMLInputElement;
          const files = target.files;

          if (files && files.length > 0) {
            this.handleFileUpload(files).finally(() => {
              // Reset the file input
              target.value = '';
            });
          }
        });
      }
    }





  async getGeminiResponse(input: string, appendHistory: boolean): Promise<void> {
    console.log(input);
    // Implement your logic here
    // Append the input to the chat history
    if (appendHistory) {
      const chatHistory = this.el.nativeElement.querySelector('.chatHistory ul') as HTMLUListElement;

      // Create new list item
      const historyLi = this.renderer.createElement('li');
      // Add event listener to the new history item
      this.renderer.listen(historyLi, 'click', () => {
        this.getGeminiResponse(input, false);
      });

      // Set inner HTML
      this.renderer.setProperty(historyLi, 'innerHTML', `<i class="fa-regular fa-message"></i> ${input}`);

      // Append new list item to chat history
      this.renderer.appendChild(chatHistory, historyLi);
    }



    // teeeeeeeeeeest api

    // Clear existing content
    const results = this.el.nativeElement.querySelector('.results') as HTMLElement;
    const inputArea = this.el.nativeElement.querySelector('.inputArea input') as HTMLInputElement;
    const startContent = this.el.nativeElement.querySelector('.startContent') as HTMLElement;
    const chatContent = this.el.nativeElement.querySelector('.chatContent') as HTMLElement;

    results.innerHTML = '';
    inputArea.value = '';
    startContent.style.display = 'none';
    chatContent.style.display = 'block';

    // Create and append result title and data
    const resultTitle = `
      <div class="resultTitle">
        <img src="assets/images/user.png"/>
        <p>${input}</p>
      </div>
    `;
    const resultData = `
      <div class="resultData">
        <img src="assets/images/bot.png"/>
        <div class="loader">
          <div class="animatedBG"></div>
          <div class="animatedBG"></div>
          <div class="animatedBG"></div>
        </div>
      </div>
    `;

    results.innerHTML += resultTitle;
    results.innerHTML += resultData;

    // Fetch response from the AI service
    const AIURL = 'http://127.0.0.1:8080/chat';

    try {
      const response = await fetch(AIURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input }),
      });

      const data = await response.json();
      console.log(data);

      // Remove the loader and append the result response
      const resultDataElement = results.querySelector('.resultData');
      if (resultDataElement) {
        resultDataElement.remove();
      }

      const resultResponse = `
        <div class="resultResponse">
          <img src="assets/images/bot.png"/>
          <p id="typeEffect">${data.response}</p>
        </div>
      `;

      results.innerHTML += resultResponse;
    } catch (error) {
      console.error('Error:', error);
    }
  }


  newChat(): void {
    const startContent = this.el.nativeElement.querySelector('.startContent') as HTMLElement;
    const chatContent = this.el.nativeElement.querySelector('.chatContent') as HTMLElement;
    const fileInput = this.el.nativeElement.querySelector('#file-upload') as HTMLInputElement;
    const sendMessageButton = this.el.nativeElement.querySelector('#send-message') as HTMLElement;
    const inputArea = this.el.nativeElement.querySelector('.inputArea input') as HTMLInputElement;

    // Show startContent and hide chatContent
    startContent.style.display = 'block';
    chatContent.style.display = 'none';

    // Reset the file input
    if (fileInput) {
      fileInput.value = ''; // Clears the selected file
    }

    // Hide the sendMessageButton
    if (sendMessageButton) {
      sendMessageButton.style.display = 'none';
    }

    // Reset the input area
    if (inputArea) {
      inputArea.value = '';
    }

  }


 // Méthode pour ouvrir/fermer la popup
 togglePopup() {
  this.showPopup = !this.showPopup;
}




}
