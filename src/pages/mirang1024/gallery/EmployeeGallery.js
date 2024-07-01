import './gallery.css';

export class EmployeeGallery {
  constructor() {
    this.containder = document.createElement('div');
    this.container.classList.add('gallery__container');
  }

  async fetchData() {
    try {
      const response = await fetch('./gallery.json');
      if (!response.ok) {
        throw new Error('Network response was not ok' + response.statusText);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
    }
  }

  async render() {
    const data = await this.fetchData();

    if (data) {
      data.forEach((item) => {
        const card = document.createElement('div');
        card.classList.add('gallery__container-card');

        card.innerHTML = `
          <div class="gallery__container-image-area">
            <img src="${item.image}" alt="${item.title}" />
          </div>
          <div class="gallery__container-title">${item.title}</div>
          <div class="gallery__container-date">${item.date}</div>
        `;

        this.container.appendChild(card);
      });
    }

    document.body.appendChild(this.container);
  }
}
