<template>
  <div class="about">
    <md-card md-with-hover>
      <md-ripple>
        <md-card-header>
          <h1 class="md-title">This is an about page</h1>
          <div class="md-subhead">It also have a ripple</div>
        </md-card-header>
        <md-card-content>
          Lorem ipsum dolor sit amet, consectetur adipisicing
          elit. Optio itaque ea, nostrum odio. Dolores, sed
          accusantium quasi non.
        </md-card-content>
        <md-card-actions>

        </md-card-actions>
      </md-ripple>
    </md-card>
  </div>
</template>

<style lang="scss" scoped="" >
.md-card {
  max-width: 600px;
  display: block;
  margin: 0 auto;

  .md-card-content {
    text-align: left;
  }
}
</style>
