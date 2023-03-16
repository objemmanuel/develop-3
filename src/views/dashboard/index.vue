<template>
  <div>
    仪表盘
    <div id="dnu"></div>
    <div id="dau"></div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { DualAxes, Line } from '@antv/g2plot'
import { useStore } from 'vuex'
const store = useStore()
onMounted(() => {
  const dnu = ref([])
  const dtu = ref([])
  // const dau = []
  store.dispatch('user/getDnu').then((res) => {
    // eslint-disable-next-line array-callback-return
    res.map(x => {
      dnu.value.push({
        time: x.time,
        dnu: x.count
      })
    })
    dualAxes.render()
  })
  store.dispatch('user/getDtu').then((res) => {
    // eslint-disable-next-line array-callback-return
    res.map(x => {
      dtu.value.push({
        time: x.time,
        dtu: x.count
      })
    })
    dualAxes.render()
  })
  const dualAxes = new DualAxes('dnu', {
    data: [dnu.value, dtu.value],
    xField: 'time',
    yField: ['dnu', 'dtu'],
    geometryOptions: [
      {
        geometry: 'column'
      },
      {
        geometry: 'line',
        lineStyle: {
          lineWidth: 2
        }
      }
    ]
  })
  // fetch('https://gw.alipayobjects.com/os/bmw-prod/1d565782-dde4-4bb6-8946-ea6a38ccf184.json')
  //   .then((res) => res.json())
  //   .then((data) => {
  //     const line = new Line('dau', {
  //       data,
  //       xField: 'Date',
  //       yField: 'scales',
  //       xAxis: {
  //         // type: 'timeCat',
  //         tickCount: 5
  //       }
  //     })
  //
  //     line.render()
  //   })
  store.dispatch('log/getDau')
    .then((data) => {
      const line = new Line('dau', {
        data,
        xField: 'day',
        yField: 'count',
        xAxis: {
          // type: 'timeCat',
          tickCount: 5
        }
      })
      line.render()
    })
})

</script>

<style scoped>

</style>
