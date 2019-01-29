<template>
  <div>
    <svg v-hammer:tap="fireworks"></svg>
  </div>
</template>

<script>
import anime from 'animejs'

export default {
  data() {
    return {
      colors: ['rgb(255, 74, 74)', 'rgb(105, 204, 110)', 'rgb(29, 153, 255)', 'rgb(214, 228, 29)', 'rgb(247, 117, 240)']
    }
  },
  mounted() {
    let svgNS = 'http://www.w3.org/2000/svg'

    let grupoBaloes = document.createElementNS( svgNS, 'g' )
    let ciculo1 = document.createElementNS( svgNS, 'circle' )
    ciculo1.setAttribute('r', 5)
    ciculo1.setAttribute('fill', 'none')
    ciculo1.setAttribute('stroke', '#444')
    ciculo1.setAttribute('stroke-width', 2)
    ciculo1.setAttribute('class', 'circulo c1')
    let ciculo2 = document.createElementNS( svgNS, 'circle' )
    ciculo2.setAttribute('r', 2)
    ciculo2.setAttribute('fill', 'none')
    ciculo2.setAttribute('stroke', '#555')
    ciculo2.setAttribute('stroke-width', 2)
    ciculo2.setAttribute('class', 'circulo c2')
    grupoBaloes.appendChild(ciculo1)
    grupoBaloes.appendChild(ciculo2)

    let bola = document.createElementNS( svgNS, 'circle' )
    bola.setAttribute('r', 10)
    bola.setAttribute('stroke', 'none')
    bola.setAttribute('stroke-width', 0)

    this.quadro = this.$el.querySelector('svg')
    this.moldeBaloes = grupoBaloes
    this.moldeBola = bola
  },
  methods: {
    /**
     * @param ev Object with the position to fire, need to have the properties ".center.x" and ".center.y"
     */
    fireworks(ev) {
      function _updateSvg(progress) {
        console.log(progress)
        let obj = progress.animatables[0].target
        obj.$el.setAttribute('transform', `translate(${obj.x} , ${obj.y})`)
      }

      let cloneBaloes = this.moldeBaloes.cloneNode(true)
      let circuloC1 = cloneBaloes.querySelector('.circulo.c1')
      let circuloC2 = cloneBaloes.querySelector('.circulo.c2')
      
      cloneBaloes.setAttribute('transform', `translate(${ev.center.x} , ${ev.center.y})`)

      this.quadro.appendChild( cloneBaloes )
      let timelineAnim = anime.timeline()
      timelineAnim.add({ targets: circuloC1, duration: 1400, easing: 'easeOutCubic', r: 155 }, 0)
      timelineAnim.add({ targets: circuloC1, duration: 400, easing: 'easeOutCubic', opacity: 0 }, '-=1200')
      timelineAnim.add({ targets: circuloC2, duration: 1400, easing: 'easeOutBack', r: 65 }, 0)
      timelineAnim.add({ targets: circuloC2, duration: 600, easing: 'easeOutCubic', opacity: 0 }, '-=1000')

      for ( let i = 0; i < Math.random() * 16 + 6; i++ ) {
        let temp = this.moldeBola.cloneNode(true)
        let dist = 40
        let x = Math.random() * dist - (dist / 2)
        let y = Math.random() * dist - (dist / 2)
        let tam = Math.sqrt( x * x + y * y )
        let dX = x * (200 / tam) - x
        let dY = y * (200 / tam) - y
        temp.setAttribute('transform', `translate(${x} , ${y})`)
        temp.setAttribute('fill', this.colors[ parseInt( Math.random() * this.colors.length ) ] )
        cloneBaloes.appendChild( temp )
        timelineAnim.add({ targets: temp, duration: 1400, easing: 'easeOutCubic', r: [{ value: 1 }, { value: 25 }, { value: 0 }] }, 0)
        timelineAnim.add({ targets: { x: 0, y: 0, $el: temp }, duration: 1400, easing: 'easeOutCubic', x: dX, y: dY, update: _updateSvg }, 0)
        timelineAnim.add({ targets: temp, duration: 400, easing: 'easeOutCubic', opacity: 0 }, '-=600')
      }

      setTimeout(()=>{
        this.quadro.removeChild( cloneBaloes )
      }, 1400 )
    },
    /**
     * Fire a random firework on the panel
     */
    randomFireworks() {
      let x = parseInt( (this.$el.clientWidth - 80) * Math.random() ) + 40
      let y = parseInt( (this.$el.clientHeight - 80) * Math.random() ) + 40
      this.fireworks({ center: { x, y } })
    }
  }
}
</script>

<style lang="scss" scoped>
div, svg {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  overflow: hidden;
}
</style>
