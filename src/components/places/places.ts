export function generatePlacesDesc(img: string, places: string, description: string): string {
    return `<button type="button" class="btn btn-primary places__btn" data-bs-toggle="modal" data-bs-target="#exampleModal">
    ${places}
  </button>
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="modal-title fs-5" id="exampleModalLabel">${places}</h2>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <img src="${img}" class="card-img-top"
            alt="Interesting places">
          <p class="modal-desc">${description}</p>
        </div>
      </div>
    </div>
  </div>`
}
