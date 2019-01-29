<template>
  <div id="fireworks-form" >
    <div class="light"></div>
    <div class="help">Click on the black Space!</div>

    <fireworks-panel ref="fw"/>

    <form>
      <h2>Fireworks Form!</h2>
      <div class="line"></div>

      <div class="md-layout md-gutter">
        <div class="md-layout-item">
          <md-field>
            <label>Write some text</label>
            <md-input v-model="valor"></md-input>
          </md-field>
        </div>
        <div class="md-layout-item">
          <md-datepicker v-model="date" />
        </div>
      </div>
      <div class="md-layout md-alignment-bottom-right">
        <md-button class="md-raised" @click="firework">Fire!</md-button>
      </div>

      <md-snackbar md-position="center" :md-duration="4000" :md-active.sync="showSnackbar">
        <span>You got the {{ lastAchievement }} achievement!</span>
        <md-button class="md-primary" @click="showSnackbar = false">Ok</md-button>
      </md-snackbar>
    </form>
  </div>
</template>

<script>
import FireworksPanel from '../components/FireworksPanel.vue'

export default {
  data() {
    return {
      valor: '',
      date: null,
      count: 0,
      lastAchievement: 0,
      showSnackbar: false
    }
  },
  components: {
    FireworksPanel
  },
  mounted() {
    let _fire = () => {
      this.$refs.fw.randomFireworks()
      let nextTime = ( 3000 * Math.random() ) + 1000
      setTimeout(_fire, nextTime)
    }
    setTimeout(_fire, 2000)
  },
  methods: {
    firework() {
      this.$refs.fw.randomFireworks()
      this.count++
      if ( this.count % 25 === 0 ) {
        this.showSnackbar = true
        this.lastAchievement = this.count
      }
    }
  }
}
</script>

<style lang="scss" scoped="">
#fireworks-form {

  position: relative;
  width: 100%;
  height: 100%;
  min-height: 600px;
  background: #222;

  .help {
    position: absolute;
    left: 50%;
    top: 200px;
    color: #333;
    transform: translate(-50%, 0);
    font-family: 'Courier New', Courier, monospace;
    font-size: 30px;
    font-weight: bold;
  }

  .quadro {
    position: absolute;
    left: 0; top: 0;
    height: 100%;
    width: 100%;
    overflow: hidden;
  }
  .light {
    position: absolute;
    top: 0;
    left: 50%;
    height: 100px;
    width: 100px;
    transform: translate(-50%, -100%);
    box-shadow: 0 50px 80px 50px #fff;
    border-radius: 50%;
    background: #fff;
    opacity: 0.1;
  }

  form {
    display: block;
    margin: 0 auto;
    padding: 20px;
    position: relative;
    top: 50%;
    /* transform: translateY(-50%); */
    min-height: 100px;
    min-width: 100px;
    max-width: 600px;
    background: #333;
    border: 1px solid #222;
    border-radius: 4px;
    box-shadow: 0 4px 8px rgba(0,0,0, 0.3);
  }

  h2 {
    color: #777;

    span {
      font-weight: normal;
      font-size: 14px;
      float: right;
    }
  }
  .line {
    background: #222;
    height: 10px;
    border-radius: 5px;
    width: 100%;
    margin: 10px 0 20px;
    box-shadow: 0 1px 4px rgba(0,0,0, 0.6) inset;
  }

}
</style>
