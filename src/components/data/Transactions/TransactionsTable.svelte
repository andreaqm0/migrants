<script lang="ts">
  import { onMount } from "svelte";
  import { filterTransactionsData } from "@/services/utils";
  import Pagination from "../Pagination.svelte";
  import { getRelativeTime } from "@/services/RelativeTime";

  export let transactions: any;
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
    data = filterTransactionsData(transactions);
  });
</script>

<div>
  <div class="overflow-x-auto">
    <table class="table text-center">
      <thead>
        <tr>
          <th>#</th>
          <th class="text-start max-w-lg">Producto</th>
          <th>Firmado Por</th>
          <th>Cantidad</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {#each rows as tr, index}
          <tr>
            <th>{(current_page - 1) * 10 + index + 1}</th>
            <td class="max-w-lg">
              <div class="flex text-start items-center gap-3">
                <div class="avatar">
                  <div class="mask mask-squircle w-12 h-12">
                    <img src={tr.imgUrl} alt="product img" />
                  </div>
                </div>
                <div>
                  <div class="font-bold text-gray-600">
                    {tr.product}
                    <div class="badge badge-outline badge-accent badge-sm">
                      {tr.category}
                    </div>
                  </div>
                  <div class="text-xs opacity-50">{tr.description}</div>
                </div>
              </div>
            </td>
            <td class="truncate">{tr.signedBy}</td>
            <td>
              <div
                class="badge badge-outline text-white py-3 font-medium"
                class:badge-primary={tr.income}
                class:badge-error={!tr.income}
              >
                {tr.income ? "+" : "-"}
                {tr.qty}
              </div>
            </td>
            <td class="text-center">
              <div
                class="tooltip"
                data-tip={new Date(tr.created_at).toLocaleString("es-mx", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })}
              >
                <div class="badge badge-sm flex gap-1 py-3 cursor-default truncate">
                  <slot name="clock-icon" />
                  {getRelativeTime(tr.created_at)}
                </div>
              </div>
            </td>
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
