<script lang="ts">
  import { onMount } from "svelte";
  import { filterStockData } from "@/services/utils";
  import Pagination from "../Pagination.svelte";

  export let stock: any;
  let data: any = [];

  // PAGINATION
  let num_per_page = 10;
  let current_page = 1;
  let num_of_pages: number;

  $: num_of_pages = Math.ceil(data.length / num_per_page);
  $: rows = data.filter(
    (el: any, index: number) =>
      index >= (current_page - 1) * num_per_page &&
      index < current_page * num_per_page
  );
  const prevPage = () => (current_page -= 1);
  const nextPage = () => (current_page += 1);
  const startPage = () => (current_page = 1);
  const endPage = () => (current_page = num_of_pages);
  const chageNumPerPage = (num: number) => (num_per_page = num);

  onMount(() => {
    // FILTERING DATA
    data = filterStockData(stock);
  });
</script>

<div>
  <div class="overflow-x-auto">
    <table class="table">
      <thead>
        <tr>
          <th> #</th>
          <th>Producto</th>
          <th class="text-center">Categoria</th>
          <th class="text-center">Cantidad</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {#each rows as item, index}
          <tr>
            <th>{(current_page - 1) * 10 + index + 1}</th><td>
              <div class="flex items-center gap-3">
                <div class="avatar">
                  <div class="mask mask-squircle w-12 h-12">
                    <img src={item.imgUrl} alt="product img" />
                  </div>
                </div>
                <div>
                  <div class="font-bold text-gray-600">{item.name}</div>
                  <div class="text-sm opacity-50">ID-{item.id}</div>
                </div>
              </div>
            </td>
            <td class="text-center">
              <span class="badge badge-outline badge-accent badge-sm truncate font-bold">
                {item.category}
              </span>
            </td>
            <td class="text-center">{item.qty}</td>
            <th class="flex justify-center items-center">
              <div class="tooltip tooltip-left" data-tip="Editar">
                <button class="btn btn-ghost btn-sm btn-square">
                  <slot name="edit-icon" />
                </button>
              </div>
              <div class="tooltip tooltip-left" data-tip="Ver transacciones">
                <button class="btn btn-ghost btn-sm btn-square">
                  <slot name="tran-icon" />
                </button>
              </div>
              <div class="flex flex-col">
                <div class="tooltip tooltip-left" data-tip="Registrar entrada">
                  <button class="btn btn-ghost btn-xs btn-square">
                    <slot name="income-icon" />
                  </button>
                </div>
                <div
                  class:tooltip={item.qty > 1}
                  class:tooltip-left={item.qty > 1}
                  data-tip="Registrar salida"
                >
                  <button
                    class="btn btn-ghost btn-xs btn-square disabled:bg-white disabled:text-gray-300"
                    disabled={item.qty < 1}
                  >
                    <slot name="withdrawal-icon" />
                  </button>
                </div>
              </div>
            </th>
          </tr>
        {:else}
          <tr>
            <td colspan="5" class="text-sm text-center text-gray-400 py-5">
              No se encontaron resultados
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
  <Pagination
    {num_of_pages}
    {num_per_page}
    {current_page}
    {prevPage}
    {nextPage}
    {startPage}
    {endPage}
    {chageNumPerPage}
  />
</div>
