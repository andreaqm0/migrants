<script lang="ts">
  import Chart, {
    type ChartDataset,
    type ChartOptions,
    type ChartType,
  } from "chart.js/auto";
  import { onMount } from "svelte";

  let chart: HTMLCanvasElement;

  export let labels: string[];
  export let datasets: ChartDataset[];
  export let options: ChartOptions;
  export let type: ChartType;
  export let classList: string | undefined = undefined;

  onMount(() => {
    const myChart = new Chart(chart, {
      type,
      data: {
        labels,
        datasets,
      },
      options,
    });

    const resizeObserver = new ResizeObserver(() => {
      myChart.resize();
    });

    resizeObserver.observe(chart);

    return () => {
      resizeObserver.disconnect();
    };
  });
</script>

<div class={classList}>
  <canvas bind:this={chart} />
</div>
