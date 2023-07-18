const createNav = () => {
    let nav = document.querySelector(".navbar");

    nav.innerHTML = `
    <nav>
    <a href="index.html" class="logo" data-tooltip="The founding logo."></a>
    <ul>
      <li>
        <a href="#" class="nav-item" data-tooltip="Return Home">Home</a>
      </li>
      <li>
        <a href="#" class="nav-item" data-tooltip="About us">About</a>
      </li>
      <li>
        <a href="#" class="nav-item" data-tooltip="Phone us">Contact</a>
      </li>
      <li>
        <a href="#" class="nav-item" data-tooltip="For all forecasting needs.">Statistical Tools</a>
      </li>
      <li>
        <a href="#" class="nav-item" data-tooltip="For all of statistical calculations.">Prediction Algorithms</a>
      </li>
      <li>
        <a href="login.html" class="nav-item" data-tooltip="Have an account?">Login</a>
      </li>
      <li>
        <a href="signup.html" class="nav-item" data-tooltip="Sign up here!">Sign-Up</a>
      </li>
    </ul>
  </nav>
    `;
};

createNav();
