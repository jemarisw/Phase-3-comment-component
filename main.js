const template = document.createElement('template');
template.innerHTML = `
<style>
  *{
    color:black;
  }

  .div-main-results{
    display:flex;
    flex-direction: row;
    margin-top: 20px;
    border-bottom: 5px solid darkorchid;
    width: 50%;

  }

#div-text-id{
  display:flex;
  flex-direction:column;
  background-color: whitesmoke;
  width: 100%;

}

.p-results{
  display:inline-block;
  margin-top: 10px;
  padding-left:10px;
  
}
</style>

<div class="div-main-results">
<div id="div-img-id" class="div-results"><img/></div>
<div id="div-text-id" class= "div-results">
  <p id="p-fullname" class="p-results"><slot name="fulln"/></p>
  <p id="p-email" class="p-results"> <slot name="em"/></p>
  <p id="p-comments" class="p-results"><slot name="response"/></p>
</div>
</div>`;

class ReusableComment extends HTMLElement {
  constructor() {
    super();
    this.name; 
    this.email; 
    this.comments; 
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.shadowRoot.querySelector('img').src = this.getAttribute('avatar');
    this.shadowRoot.querySelector('#p-fullname');
    this.shadowRoot.querySelector('#p-email');
    this.shadowRoot.querySelector('#p-comments');
  }

  static get observedAttributes() {
    return ['name', 'email', 'cmts'];
  }

  attributeChangedCallback(prop, oldVal, newVal) {
    if (oldVal === newVal) return;

    if (prop === 'name') {
      if (this.shadowRoot.querySelector('#p-fullname')) {
        this.shadowRoot.querySelector('#p-fullname').textContent = newVal;
      }
    } else if (prop === 'email') {
      if (this.shadowRoot.querySelector('#p-email')) {
        this.shadowRoot.querySelector('#p-email').textContent = newVal;
      }
    } else if (prop === 'cmts') {
      if (this.shadowRoot.querySelector('#p-comments')) {
        this.shadowRoot.querySelector('#p-comments').textContent = newVal;
      }
    }
  }

  connectCallback() {
    const nameAttr = this.getAttribute('name');
    const emailAttr = this.getAttribute('email');
    const cmtsAttr = this.getAttribute('cmts');

    if (nameAttr) {
      this.shadowRoot.textContent = nameAttr;
    } else if (emailAttr) {
      this.shadowRoot.textContent = emailAttr;
    } else if (cmtsAttr) {
      this.shadowRoot.textContent = cmtsAttr;
    }
  }
}

window.customElements.define('reusable-comment', ReusableComment);
