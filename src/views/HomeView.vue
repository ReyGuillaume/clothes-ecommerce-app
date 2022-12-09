<script lang="js">

</script>

<template>
  <div class="home-container container">
    <div class="presentation">
      <div class="image">
        <img src="../assets/images/accueil1.jpg" alt="accueil">
        <h3>Comme un air de déjà vu</h3>
        <p>La mode dans votre poche</p>
      </div>
      <div class="void">
        <h3>Sapes</h3>
        <p>Qween of shoes</p>
      </div>
      <div class="image">
        <img src="../assets/images/accueil2.jpg" alt="accueil">
        <h3>Sapes 'risti !</h3>
        <p>Quelle sacrée ristourne</p>
      </div>
      <div class="void">
        <h3>Sapes 'ar exemple</h3>
        <p>Quelle beauté !</p>
      </div>
      <div class="image">
        <img src="../assets/images/accueil3.jpg" alt="accueil">
      </div>
      <div class="void">
        <h3>Sensible</h3>
        <p>Au grand coeur</p>
      </div>
    </div>
  </div>
</template>

<style>
.presentation {
  font-size: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.presentation > * {
  display: flex;
  flex-direction: column;
  gap: 1.5em;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 1rem;
  width: 100vw;
  height: 100vw;
  max-width: 25rem;
  max-height: 25rem;
}
.presentation h3,
.presentation p {
  text-align: center;
}
.presentation p {
  font-size: .85em;
}
.presentation > .image > img {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: -5;
}
.presentation > .image {
  text-shadow: 1px 1px #000;
  color: #fff;
}


@media screen and (min-width: 720px) {
  .presentation {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(3, 27vw);
  }
  .presentation > * {
    width: 100%;
    height: 100%;
    max-width: none;
    max-height: none;
    background-color: #00000010;
  }
  .presentation > div:nth-child(1) {
    grid-column: 1 / 3;
    grid-row: 1 / 3;
  }
  .presentation > div:nth-child(2) {
    grid-column: 3;
    grid-row: 1 / 3;
  }
  .presentation > div:nth-child(3) {
    grid-column: 4;
    grid-row: 1 / 3;
  }
  .presentation > div:nth-child(4) {
    grid-column: 1;
    grid-row: 3;
  }
  .presentation > div:nth-child(5) {
    grid-column: 2 / 4;
    grid-row: 3;
  }
  .presentation > div:nth-child(6) {
    grid-column: 4;
    grid-row: 3;
  }
}

</style>