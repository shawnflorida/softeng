const createFooter = () => {
  let footer = document.querySelector(".footer-container");

  footer.innerHTML = `
    <footer>
    <div class="footer-content">
      <p>
        &copy; 2023 E-Statistica. All rights reserved. | Contact us at
        noalligiance@gmail.com
      </p>
    </div>
  </footer>
    `;
};

createFooter();
