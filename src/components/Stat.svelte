<script lang="ts" type="module">
    const value = Math.floor(Math.random() * 999)
</script>

<div class="stat-item col-span-4 sm:col-span-2 2xl:col-span-1">
    <div class="stat-figure text-green-500">
        <slot name="icon" />
    </div>
    <div class="stat-title"><slot name="title" /></div>
    <div class="stat-value">{value}</div>
    <div class="stat-desc"><slot name="desc" /></div>
</div>

<style>
    .stat-item {
      display: grid;
      grid-template-columns: 1, 1fr;
      column-gap: 1rem;
      padding: 1rem 1.5rem;
      border-bottom-width: 1px;
    }

    .stat-item:last-child {
      border-bottom-width: 0px;
    }

    @media (min-width: 640px) {
      .stat-item {
        border-inline-end-width: 1px;
      }
      .stat-item:nth-child(even) {
        border-inline-end-width: 0px;
      }
      .stat-item:nth-last-child(-n + 2) {
        border-bottom-width: 0px;
      }
    }

    @media (min-width: 1536px) {
      .stat-item:nth-child(even) {
        border-inline-end-width: 1px;
      }
      .stat-item:last-child {
        border-inline-end-width: 0px;
      }
      .stat-item:nth-last-child(n + 2) {
        border-bottom-width: 0px;
      }
    }
  </style>