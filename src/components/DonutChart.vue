<script>
import { Doughnut } from "vue-chartjs";

// export default {
//   extends: Doughnut,
//   data: () => ({
//     chartdata: {
//       labels: ['January', 'February'],
//       datasets: [
//         {
//           label: 'Data One',
//           backgroundColor: '#f87979',
//           data: [40, 20]
//         }
//       ]
//     },
//     options: {
//       responsive: true,
//       maintainAspectRatio: false
//     }
//   }),

//   mounted () {
//     this.renderChart(this.chartdata, this.options)
//   }
// }
export default {
  name: "Doughnut",
  extends: Doughnut,
  props: ['chartData'],
  data() {
    return {
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  mounted() {
   this.chartData ? this.renderChart(this.chartData, this.chartOptions) : null;
  },
  watch: {
    chartData: function() {
      this.renderChart(this.chartData, this.chartOptions)
    },
  },
};
</script>
