<script lang="ts">
  export let num_per_page = 10;
  export let current_page = 1;
  export let num_of_pages: number;
  export let prevPage: Function;
  export let nextPage: Function;
  export let startPage: Function;
  export let endPage: Function;
  export let chageNumPerPage: Function
</script>

<div>
  <div class="flex justify-between items-center mt-10">
    <div class="flex items-center gap-1">
      <button
        class="btn btn-sm btn-outline btn-square"
        disabled={current_page === 1}
        on:click={() => startPage()}
      >
        <svg
          class="w-3 h-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 12 10"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 1 1 5l4 4m6-8L7 5l4 4"
          />
        </svg>
      </button>
      <button
        class="btn btn-sm btn-outline btn-square"
        disabled={current_page === 1}
        on:click={() => prevPage()}
      >
        <svg
          class="w-[0.7rem] h-[0.7rem]"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 6 10"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 1 1 5l4 4"
          />
        </svg>
      </button>
    </div>
    <select
      class="select select-sm select-bordered max-w-xs"
      on:change={(e) => {
        chageNumPerPage(parseInt(e.target.value))
        startPage()
      }}
      bind:value={num_per_page}
    >
      <option disabled>Elementos por página</option>
      <option value={10}>10</option>
      <option value={25}>25</option>
      <option value={50}>50</option>
      <option value={100}>100</option>
    </select>
    <div class="flex items-center gap-1">
      <button
        class="btn btn-sm btn-outline btn-square"
        disabled={current_page === num_of_pages}
        on:click={() => nextPage()}
      >
        <svg
          class="w-[0.7rem] h-[0.7rem]"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 6 10"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m1 9 4-4-4-4"
          />
        </svg>
      </button>
      <button
        class="btn btn-sm btn-outline btn-square"
        disabled={current_page === num_of_pages}
        on:click={() => endPage()}
      >
        <svg
          class="w-3 h-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 12 10"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m7 9 4-4-4-4M1 9l4-4-4-4"
          />
        </svg>
      </button>
    </div>
  </div>

  <div class="text-sm text-gray-400 text-center mt-5">
    Página {current_page} de {num_of_pages || 1}
  </div>
</div>
